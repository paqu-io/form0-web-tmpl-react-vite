import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import Form0Form from "./Form0Form";
import { Button } from "@/components/ui/button";
import form0Config from "../../form0.config.js";

export default function FormSpotlight({ open, onOpenChange, theme, formWidth, labelWidthPercent }) {
  // Use config defaults when props not provided
  const effectiveFormWidth = formWidth ?? form0Config.layout.formWidth;
  const effectiveLabelWidth = labelWidthPercent ?? form0Config.layout.labelWidthPercent;

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
          <DrawerTitle>Form (Spotlight)</DrawerTitle>
            <DrawerDescription>
              Fill out the form and submit your information.
            </DrawerDescription>
        </DrawerHeader>
        <Form0Form
          theme={theme}
          formWidth={effectiveFormWidth}
          labelWidthPercent={effectiveLabelWidth}
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