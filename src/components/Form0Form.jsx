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

export default function Form0Form({
  schema,
  initialValues,
  theme,
  colorMode,
  onSubmit,
  labelPosition,
  formWidth,
  labelWidthPercent,
  simplifiedMode = false,
  onSimplifiedNavigation,
  placement = 'form-page',
  onRequestClose,
  debug = false,
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
    (vals, meta = {}) => {
      console.info('🚀 [RECORD SUBMIT] Starting form submission...');

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

  return (
    <div style={formStyle}>
      <FieldRegistryProvider renderers={renderers}>
        <FormRenderer
          schema={schema}
          debug={debug}
          initialValues={initialValues}
          onSubmit={onSubmit || defaultStructuredSubmit}
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
          onRequestClose={onRequestClose}
          {...props}
        />
      </FieldRegistryProvider>
    </div>
  );
}
