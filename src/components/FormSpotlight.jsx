import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import Form0Form from './Form0Form';
import { mergeLayoutProps } from '../lib/presentation-settings.js';

export default function FormSpotlight({
  open,
  onOpenChange,
  schema,
  theme,
  formTitle = 'Form',
  formWidth,
  labelWidthPercent,
  labelPosition,
}) {
  const layoutConfig = mergeLayoutProps(
    { theme, formWidth, labelWidthPercent, labelPosition },
    'spotlight',
  );

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction="right"
      modal={false}
      shouldScaleBackground={false}
    >
      <DrawerContent
        className="max-h-[100vh] overflow-y-auto overflow-x-hidden p-6 rounded-l-lg"
        style={{
          width: layoutConfig.formWidth,
          maxWidth: layoutConfig.formWidth,
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DrawerHeader>
          <DrawerTitle>{formTitle} (Spotlight)</DrawerTitle>
          <DrawerDescription>Fill out the form and submit your information.</DrawerDescription>
        </DrawerHeader>
        <Form0Form
          schema={schema}
          theme={layoutConfig.theme}
          formWidth={layoutConfig.formWidth}
          labelWidthPercent={layoutConfig.labelWidthPercent}
          labelPosition={layoutConfig.labelPosition}
          placement="form-spotlight"
          onRequestClose={() => onOpenChange(false)}
        />
      </DrawerContent>
    </Drawer>
  );
} 
