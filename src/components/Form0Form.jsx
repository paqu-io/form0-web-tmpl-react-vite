import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { FieldRegistryProvider, FormRenderer } from 'form0-react';
import { createStructuredRecord, flattenFields } from 'form0-core';
import form0Config from '../../form0.config.js';
import { resolveRenderer } from '../field-renderers/resolver.js';
import {
  injectMediaFieldUUIDs,
  ensureRecordOptionIds,
  regenerateRepeatableRecordIds,
} from '../lib/record-utils.js';

const FIELD_KEY_MODE = form0Config.output?.useKeys ? 'prefer-key' : 'data-name';
const DEV_SERVER_CONFIG = form0Config.devServer || {};
const DEV_SERVER_SUBMIT = DEV_SERVER_CONFIG.submitToConnector === true;
const DEV_SERVER_API_BASE = (DEV_SERVER_CONFIG.apiBaseUrl || '/api').replace(/\/$/, '');
const META_VALUE_KEYS = new Set([
  'created_at',
  'updated_at',
  'created_at_client',
  'updated_at_client',
  'created_at_server',
  'updated_at_server',
]);

export default function Form0Form({
  schema,
  initialValues,
  theme,
  colorMode,
  onSubmit,
  useDefaultSubmitHandler = true,
  labelPosition,
  formWidth,
  labelWidthPercent,
  simplifiedMode = false,
  onSimplifiedNavigation,
  placement = 'form-page',
  onRequestClose,
  debug = false,
  mode: modeOverride,
  autoCloseOverlayOnSubmit: autoCloseOverride,
  engineMode: engineModeOverride,
  engineStoreMode: engineStoreModeOverride,
  interactionPresentations: interactionPresentationsOverride,
  showPrimaryActionsInViewMode: showPrimaryActionsInViewModeOverride,
  ...props
}) {
  const didLogSchema = useRef(false);
  const [customTheme, setCustomTheme] = useState(null);

  const schemaElements = schema?.form?.elements ?? [];
  const flattenedFields = useMemo(() => flattenFields(schemaElements), [schemaElements]);

  // Dynamically load custom theme if specified in config
  useEffect(() => {
    if (form0Config.theme.customTheme) {
      import(/* @vite-ignore */ form0Config.theme.customTheme)
        .then((module) => {
          // The theme export might be named differently, try common patterns
          const themeExport = module.myCustomTheme || module.default || module;
          setCustomTheme(themeExport);
          console.log('[form0] Custom theme loaded successfully');
        })
        .catch((error) => {
          console.error(
            `[form0] Failed to load custom theme from "${form0Config.theme.customTheme}":`,
            error,
          );
          console.warn('[form0] Falling back to default theme');
        });
    }
  }, []);

  // Resolve field renderers from config
  const renderers = useMemo(() => {
    const resolved = {};

    if (form0Config.fieldRenderers) {
      Object.entries(form0Config.fieldRenderers).forEach(([fieldType, rendererId]) => {
        const component = resolveRenderer(rendererId);
        if (component) {
          resolved[fieldType] = component;
        }
      });
    }

    return resolved;
  }, []);

  const defaultStructuredSubmit = useCallback(
    async (vals, meta = {}) => {
      console.info('🚀 [RECORD SUBMIT] Starting record submission...');

      // If the renderer already produced a structured record, just log it
      const hasStructuredRecord = vals && typeof vals === 'object' && vals.form_values;
      const rawValues =
        meta?.rawValues && typeof meta.rawValues === 'object' ? meta.rawValues : null;
      const repeatableValues = meta?.repeatable || {};
      const timestamps = meta?.timestamps || {};
      const statusFieldName = schema?.form?.status_field?.data_name || null;
      const statusValue = statusFieldName ? rawValues?.[statusFieldName] ?? null : null;
      const fieldNames = new Set(
        (flattenedFields || []).map((field) => field?.data_name).filter(Boolean),
      );
      const devServerHint = `form0 dev server is not reachable at ${DEV_SERVER_API_BASE}. Run "form0 serve --app" for app projects, or "form0 serve" if this is not an app project. If you start the app dev server directly, make sure it proxies ${DEV_SERVER_API_BASE} to the CLI server.`;

      const parseJsonResponse = async (response) => {
        const text = await response.text();
        if (!text) {
          return { data: null, text: '' };
        }
        try {
          return { data: JSON.parse(text), text };
        } catch (err) {
          return { data: null, text };
        }
      };

      const sanitizeValues = (values) => {
        if (!values || typeof values !== 'object') {
          return values;
        }

        return Object.fromEntries(
          Object.entries(values).filter(([key]) => {
            if (META_VALUE_KEYS.has(key) && !fieldNames.has(key)) {
              return false;
            }
            if (key === statusFieldName && statusFieldName && !fieldNames.has(key)) {
              return false;
            }
            return true;
          }),
        );
      };

      if (DEV_SERVER_SUBMIT) {
        try {
          let record = vals;

          const needsServerRecord = !hasStructuredRecord || !vals?.id || !vals?.changeset_id;

          if (needsServerRecord) {
            if (!schema?.form) {
              throw new Error('Form schema not available for record creation.');
            }

            if (!rawValues) {
              throw new Error('Raw form values are missing for record creation.');
            }

            const cleanedValues = sanitizeValues(rawValues);

            const requestBody = {
              state: { values: cleanedValues, repeatable: repeatableValues },
              options: {
                '@status': statusValue ?? undefined,
                fieldKeyMode: FIELD_KEY_MODE,
                created_at_client: timestamps.created_at_client ?? undefined,
                updated_at_client: timestamps.updated_at_client ?? undefined,
                created_at_server: timestamps.created_at_server ?? null,
                updated_at_server: timestamps.updated_at_server ?? null,
              },
            };

            if (schema && typeof schema === 'object') {
              requestBody.schema = schema;
            }

            const createResponse = await fetch(`${DEV_SERVER_API_BASE}/create-record`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody),
            });

            const { data: createPayload } = await parseJsonResponse(createResponse);
            if (!createResponse.ok || !createPayload) {
              const baseMessage = createPayload?.error || devServerHint;
              const suffix = createPayload?.error ? ` ${devServerHint}` : '';
              throw new Error(`${baseMessage}${suffix}`);
            }

            record = createPayload.record;
          }

          console.info('📋 [STRUCTURED RECORD] Generated structured JSON record:');
          console.log(record);

          console.info('💾 [DATABASE SUBMIT] Submitting to configured connectors...');

          const submitResponse = await fetch(`${DEV_SERVER_API_BASE}/submit-record`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ record }),
          });

          const { data: submitPayload } = await parseJsonResponse(submitResponse);
          if (!submitResponse.ok || !submitPayload) {
            throw new Error(submitPayload?.error || devServerHint);
          }

          if (submitPayload.success) {
            console.log(`✅ [DATABASE SUBMIT] ${submitPayload.message}`);
          } else {
            console.warn(`⚠️ [DATABASE SUBMIT] ${submitPayload.message}`);
          }

          if (Array.isArray(submitPayload.connectorResults)) {
            submitPayload.connectorResults.forEach((result) => {
              const status = result.success ? '✅' : '❌';
              const details = result.success
                ? result.message || 'Success'
                : result.error || 'Unknown error';
              console.log(`   ${status} ${result.connector}: ${details}`);
            });
          }
          return;
        } catch (error) {
          const errorMessage = error?.message || '';
          const shouldHint =
            error instanceof TypeError ||
            error instanceof SyntaxError ||
            /Failed to fetch|Unexpected end of JSON|NetworkError|ECONNREFUSED|proxy/i.test(
              errorMessage,
            );

          if (shouldHint && !errorMessage.includes(devServerHint)) {
            console.warn(`[form0] ${devServerHint}`);
          }
          console.error('[form0] Failed to submit record to dev server.', error);
        }
      }

      if (hasStructuredRecord) {
        console.info('📋 [STRUCTURED RECORD] Received structured JSON record:');
        console.log(vals);
        return;
      }

      if (!schema?.form) {
        console.info('📋 [STRUCTURED RECORD] Generated structured JSON record (raw values):');
        console.log(vals);
        return;
      }

      try {
        const statusFieldName = schema.form.status_field?.data_name ?? null;
        const valuesWithMediaIds = injectMediaFieldUUIDs(vals, flattenedFields);

        const recordOptions = ensureRecordOptionIds({
          fieldKeyMode: FIELD_KEY_MODE,
          originalElements: schemaElements,
          title_field: schema.form.title_field || null,
          status_field: schema.form.status_field || null,
          form_id: schema.form.id || null,
        });

        if (statusFieldName) {
          recordOptions['@status'] = valuesWithMediaIds[statusFieldName] ?? null;
          delete valuesWithMediaIds[statusFieldName];
        }

        const structuredRecord = createStructuredRecord(
          {
            values: valuesWithMediaIds,
            repeatable: meta?.repeatable || {},
          },
          flattenedFields,
          recordOptions,
        );
        regenerateRepeatableRecordIds(structuredRecord);

        console.info('📋 [STRUCTURED RECORD] Generated structured JSON record:');
        console.log(structuredRecord);
      } catch (error) {
        console.error('[form0] Failed to build structured record. Falling back to raw values.', error);
        console.info('📋 [STRUCTURED RECORD] Generated structured JSON record (raw values):');
        console.log({ values: vals, repeatable: meta?.repeatable || {} });
      }
    },
    [flattenedFields, schema, schemaElements],
  );

  // Merge config defaults with component props (props take precedence)
  const effectiveLabelPosition = labelPosition ?? form0Config.layout.labelPosition;
  const effectiveLabelWidthPercent = labelWidthPercent ?? form0Config.layout.labelWidthPercent;
  const effectiveFormWidth = formWidth ?? form0Config.layout.formWidth;
  const effectiveColorMode = colorMode ?? form0Config.theme.mode;
  const effectiveTheme = customTheme || theme;

  // Build style object with CSS custom properties scoped to this form instance
  // Note: labelWidthPercent is passed as a prop to FormRenderer, which applies it
  // at the field level. We set it here as a fallback/default.
  const formStyle = {};
  if (effectiveLabelWidthPercent !== undefined) {
    formStyle['--label-width'] = `${effectiveLabelWidthPercent}%`;
  }
  if (effectiveFormWidth !== undefined) {
    formStyle['--form0-form-width'] = effectiveFormWidth;
  }
  if (effectiveLabelPosition !== undefined) {
    formStyle['--form0-label-position'] = effectiveLabelPosition;
  }

  if (!schema) {
    return (
      <div role="status" style={{ padding: '1rem', textAlign: 'center' }}>
        Loading schema...
      </div>
    );
  }

  const resolveMode = (value) => {
    if (value === 'readonly' || value === 'view') {
      return 'readonly';
    }
    if (value === 'edit') {
      return 'edit';
    }
    return undefined;
  };

  const configInteractionMode = resolveMode(form0Config.interaction?.defaultMode) || 'edit';
  const effectiveMode = resolveMode(modeOverride) || configInteractionMode;
  const configCloseOverlay =
    typeof form0Config.interaction?.closeOverlayOnSubmit === 'boolean'
      ? form0Config.interaction?.closeOverlayOnSubmit
      : false;
  const effectiveCloseOverlay =
    typeof autoCloseOverride === 'boolean' ? autoCloseOverride : configCloseOverlay;
  const configEngineMode =
    form0Config.engine?.mode === 'worker' ? 'worker' : 'main-thread';
  const effectiveEngineMode = engineModeOverride || configEngineMode;
  const configEngineStore =
    form0Config.engine?.store === 'selector' ? 'selector' : 'snapshot';
  const effectiveEngineStoreMode = engineStoreModeOverride || configEngineStore;
  const interactionPresentations =
    interactionPresentationsOverride ?? form0Config.interaction?.presentations ?? null;
  const configShowPrimaryActionsInViewMode =
    form0Config.interaction?.showPrimaryActionsInViewMode;
  const effectiveShowPrimaryActionsInViewMode =
    typeof showPrimaryActionsInViewModeOverride === 'boolean'
      ? showPrimaryActionsInViewModeOverride
      : configShowPrimaryActionsInViewMode !== false;
  const buildingPlanModalWidthOverride = form0Config.buildingPlan?.modalWidthOverride || null;

  return (
    <div style={formStyle}>
      <FieldRegistryProvider renderers={renderers}>
        <FormRenderer
          schema={schema}
          debug={debug}
          initialValues={initialValues}
          onSubmit={
            onSubmit ??
            (useDefaultSubmitHandler ? defaultStructuredSubmit : undefined)
          }
          onSchemaReady={(schemaWithKeys) => {
            if (!didLogSchema.current) {
              console.log(schemaWithKeys);
              didLogSchema.current = true;
            }
          }}
          theme={effectiveTheme}
          colorMode={effectiveColorMode}
          labelPosition={effectiveLabelPosition}
          labelWidthPercent={effectiveLabelWidthPercent}
          formWidth={effectiveFormWidth}
          simplifiedMode={simplifiedMode}
          onSimplifiedNavigation={onSimplifiedNavigation}
          formPlacement={placement}
          interactionPresentations={interactionPresentations}
          onRequestClose={onRequestClose}
          mode={effectiveMode}
          autoCloseOverlayOnSubmit={effectiveCloseOverlay}
          engineMode={effectiveEngineMode}
          engineStoreMode={effectiveEngineStoreMode}
          showPrimaryActionsInViewMode={effectiveShowPrimaryActionsInViewMode}
          fieldKeyMode={FIELD_KEY_MODE}
          buildingPlanModalWidthOverride={buildingPlanModalWidthOverride}
          {...props}
        />
      </FieldRegistryProvider>
    </div>
  );
}
