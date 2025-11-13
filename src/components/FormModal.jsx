import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
        className="max-h-[97vh] overflow-y-auto overflow-x-hidden"
        style={{
          width: layoutConfig.formWidth,
          maxWidth: layoutConfig.formWidth,
          boxSizing: 'border-box',
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
          placement="form-modal"
          onRequestClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 
