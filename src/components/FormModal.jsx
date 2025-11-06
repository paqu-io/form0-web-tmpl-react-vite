import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import Form0Form from "./Form0Form";
import { Button } from "@/components/ui/button";
import form0Config from "../../form0.config.js";

export default function FormModal({ open, onOpenChange, theme, formWidth, labelWidthPercent }) {
  // Use config defaults when props not provided
  const effectiveFormWidth = formWidth ?? form0Config.layout.formWidth;
  const effectiveLabelWidth = labelWidthPercent ?? form0Config.layout.labelWidthPercent;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[97vh] overflow-y-auto"
        style={{
          width: effectiveFormWidth, 
          maxWidth: effectiveFormWidth,
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Form (Modal)</DialogTitle>
            <DialogDescription>
              Fill out the form and submit your information.
            </DialogDescription>
        </DialogHeader>
        <Form0Form
          theme={theme}
          formWidth={effectiveFormWidth}
          labelWidthPercent={effectiveLabelWidth}
          //onSubmit={(vals) => {
          //  alert(JSON.stringify(vals, null, 2));
          //  onOpenChange(false);
          //}}
        />
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
} 