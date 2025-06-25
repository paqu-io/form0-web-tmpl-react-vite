import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormModal from "../components/FormModal";
import FormSpotlight from "../components/FormSpotlight";
import { myCustomTheme } from '../custom-theme.css.js';

export default function Home() {
  const [theme, setTheme] = useState("standard");
  const [labelWidth, setlabelWidth] = useState("30vw");
  const [formWidth, setformWidth] = useState("30vw");
  const [modalOpen, setModalOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  const navigate = useNavigate();

  return (
    // OUTER WRAPPER: fills viewport, centers child
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(0, 128, 255, 0.05)" // optional, for debugging
    }}>
      {/* INNER CONTAINER: fixed width, responsive */}
      <div style={{
        maxWidth: 600,
        width: "100%",
        textAlign: "center",
        background: "rgba(0, 128, 255, 0.1)" // optional, for debugging
      }}>
      <h1>Choose Form Theme</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Button onClick={() => { setTheme("standard"); navigate("/form/standard") }}>Open Standard (New Page)</Button>
        <Button onClick={() => { setformWidth("60vw"); setlabelWidth(40); setTheme("modal"); setModalOpen(true) }}>Open Modal</Button>
        <Button onClick={() => { setTheme("simplified"); navigate("/form/simplified") }}>Open Simplified (New Page)</Button>
        <Button
          onClick={e => {
            setformWidth("50vw");
            setlabelWidth(20);
            setTheme("spotlight");
            setSpotlightOpen(true);
            e.currentTarget.blur(); // <-- This blurs the button after click
          }}
        >
          Open Spotlight (Drawer)
        </Button>
      </div>
      <FormModal open={modalOpen} onOpenChange={setModalOpen} formWidth={formWidth} labelWidthPercent={labelWidth} />
      <FormSpotlight open={spotlightOpen} onOpenChange={setSpotlightOpen} formWidth={formWidth} labelWidthPercent={labelWidth} />
    </div>
    </div>
  );
} 