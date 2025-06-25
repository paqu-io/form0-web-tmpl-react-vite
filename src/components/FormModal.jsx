import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import Form0Form from "./Form0Form";
import { Button } from "@/components/ui/button";

export default function FormModal({ open, onOpenChange, theme, formWidth, labelWidthPercent }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[97vh] overflow-y-auto"
        style={{
          '--label-width': `${labelWidthPercent}%`,
          width: formWidth, 
          maxWidth: formWidth,
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
          onSubmit={(vals) => {
            alert(JSON.stringify(vals, null, 2));
            onOpenChange(false);
          }}
        />
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
} 