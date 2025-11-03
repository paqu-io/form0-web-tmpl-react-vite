import { useMemo, useRef } from "react";
import { FieldRegistryProvider, FormRenderer } from "form0-react";
import schema from "../form.schema.js";
import { Form0DateField } from "../field-renderers/index.js";
//import { myCustomTheme } from '../custom-theme.css.js';

export default function Form0Form({ 
  theme, 
  colorMode = "light", 
  onSubmit, 
  labelPosition = 'side', 
  formWidth, 
  labelWidthPercent, 
  simplifiedMode = false,
  onSimplifiedNavigation,
  ...props 
}) {
  const didLogSchema = useRef(false);
  const renderers = useMemo(
    () => ({
      DateField: Form0DateField,
    }),
    []
  );

  return (
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
        theme={theme}
        //theme={myCustomTheme} // Custom theme
        colorMode={colorMode}
        labelPosition={labelPosition}
        labelWidthPercent={labelWidthPercent}
        formWidth={formWidth}
        simplifiedMode={simplifiedMode}
        onSimplifiedNavigation={onSimplifiedNavigation}
        {...props}
      />
    </FieldRegistryProvider>
  );
} 
