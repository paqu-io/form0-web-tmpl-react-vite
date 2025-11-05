import { useMemo, useRef } from "react";
import { FieldRegistryProvider, FormRenderer } from "form0-react";
import schema from "../form.schema.js";
import form0Config from "../../form0.config.js";
import { resolveRenderer } from "../field-renderers/resolver.js";

// Load custom theme if specified in config
let customThemeModule = null;
if (form0Config.theme.customTheme) {
  // Dynamic import would go here in production
  // For now, we'll handle this in a future enhancement
  console.log(`[form0] Custom theme specified: ${form0Config.theme.customTheme}`);
}

export default function Form0Form({ 
  theme, 
  colorMode, 
  onSubmit, 
  labelPosition, 
  formWidth, 
  labelWidthPercent, 
  simplifiedMode = false,
  onSimplifiedNavigation,
  ...props 
}) {
  const didLogSchema = useRef(false);
  
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

  // Merge config defaults with component props (props take precedence)
  const effectiveLabelPosition = labelPosition ?? form0Config.layout.labelPosition;
  const effectiveLabelWidthPercent = labelWidthPercent ?? form0Config.layout.labelWidthPercent;
  const effectiveFormWidth = formWidth ?? form0Config.layout.formWidth;
  const effectiveColorMode = colorMode ?? form0Config.theme.mode;
  const effectiveTheme = customThemeModule || theme;

  // Build style object with CSS custom properties scoped to this form instance
  const formStyle = {};
  if (effectiveLabelWidthPercent !== undefined) {
    formStyle['--form0-label-width'] = `${effectiveLabelWidthPercent}%`;
  }
  if (effectiveFormWidth !== undefined) {
    formStyle['--form0-form-width'] = effectiveFormWidth;
  }
  if (effectiveLabelPosition !== undefined) {
    formStyle['--form0-label-position'] = effectiveLabelPosition;
  }

  return (
    <div style={formStyle}>
      <FieldRegistryProvider renderers={renderers}>
        <FormRenderer
          schema={schema}
          debug
          initialValues={{ age: 18 }}
          onSubmit={onSubmit || ((vals) => alert(JSON.stringify(vals, null, 2)))}
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
          {...props}
        />
      </FieldRegistryProvider>
    </div>
  );
} 
