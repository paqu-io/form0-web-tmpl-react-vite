import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Form0Form from "../components/Form0Form";
import form0Config from "../../form0.config.js";

export default function FormPage() {
  const { theme } = useParams();
  const navigate = useNavigate();
  const isSimplifiedMode = theme === "simplified";

  // Use config defaults for layout
  const formWidth = form0Config.layout.formWidth;

  return (
    <div
      style={{
        maxWidth: "100vw",
        width: formWidth,
        margin: "1rem auto",
      }}
    >
      <Button onClick={() => navigate("/")}>← Back</Button>
      <h2>Form ({theme})</h2>
      <Form0Form
        theme={theme}
        simplifiedMode={isSimplifiedMode}
        //onSubmit={(vals) => alert(JSON.stringify(vals, null, 2))}
        onSimplifiedNavigation={(navigation) => {
          console.log('Simplified navigation:', navigation);
        }}
      />
    </div>
  );
} 