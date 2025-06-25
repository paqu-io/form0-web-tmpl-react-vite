import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import Form0Form from "./Form0Form";
import { Button } from "@/components/ui/button";

export default function FormSpotlight({ open, onOpenChange, theme, formWidth, labelWidthPercent }) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent
        className="max-h-[100vh] overflow-y-auto overflow-x-hidden p-6 rounded-l-lg"
        style={{
          '--label-width': `${labelWidthPercent}%`,
          width: formWidth, 
          maxWidth: formWidth,
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
          //formWidth={formWidth}
          onSubmit={(vals) => {
            alert(JSON.stringify(vals, null, 2));
            onOpenChange(false);
          }}
        />
        <DrawerClose asChild>
          <Button>Close</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
} 