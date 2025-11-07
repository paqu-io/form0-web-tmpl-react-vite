import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import Form0Form from './Form0Form';
import form0Config from '../../form0.config.js';

export default function FormSpotlight({
  open,
  onOpenChange,
  schema,
  theme = 'standard',
  formTitle = 'Form',
  formWidth,
  labelWidthPercent,
  labelPosition,
}) {
  // Use config defaults when props not provided
  const effectiveFormWidth = formWidth ?? form0Config.layout.formWidth;
  const effectiveLabelWidth = labelWidthPercent ?? form0Config.layout.labelWidthPercent;
  const effectiveLabelPosition = labelPosition ?? form0Config.layout.labelPosition;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent
        className="max-h-[100vh] overflow-y-auto overflow-x-hidden p-6 rounded-l-lg"
        style={{
          width: effectiveFormWidth, 
          maxWidth: effectiveFormWidth,
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
          theme={theme}
          formWidth={effectiveFormWidth}
          labelWidthPercent={effectiveLabelWidth}
          labelPosition={effectiveLabelPosition}
          //onSubmit={(vals) => {
          //  alert(JSON.stringify(vals, null, 2));
          //  onOpenChange(false);
          //}}
        />
        <DrawerClose asChild>
          <Button>Close</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
} 
