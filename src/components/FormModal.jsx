import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Form0Form from './Form0Form';
import { mergeLayoutProps } from '../lib/presentation-settings.js';

export default function FormModal({
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
    'modal',
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[97vh] overflow-y-auto"
        style={{
          width: layoutConfig.formWidth,
          maxWidth: layoutConfig.formWidth,
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{formTitle} (Modal)</DialogTitle>
          <DialogDescription>Fill out the form and submit your information.</DialogDescription>
        </DialogHeader>
        <Form0Form
          schema={schema}
          theme={layoutConfig.theme}
          formWidth={layoutConfig.formWidth}
          labelWidthPercent={layoutConfig.labelWidthPercent}
          labelPosition={layoutConfig.labelPosition}
        />
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
} 
