import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Form0Form from './Form0Form';
import { mergeLayoutProps } from '../lib/presentation-settings.js';

const DIALOG_HORIZONTAL_PADDING_REM = 3; // tailwind p-6 => 1.5rem each side

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

  const paddedModalWidth = layoutConfig.formWidth
    ? `calc(${layoutConfig.formWidth} + ${DIALOG_HORIZONTAL_PADDING_REM}rem)`
    : undefined;
  const viewportMaxWidth = 'calc(100vw - 2rem)';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[97vh] overflow-y-auto overflow-x-hidden"
        style={{
          width: paddedModalWidth,
          maxWidth: viewportMaxWidth,
          height: '97vh',
          maxHeight: '97vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
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
