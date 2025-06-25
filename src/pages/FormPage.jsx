import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Form0Form from "../components/Form0Form";

export default function FormPage() {
  const { theme } = useParams();
  const navigate = useNavigate();

  const formWidth = "70vw";
  const labelWidthPercent = 30;
  const isSimplifiedMode = theme === "simplified";

  return (
    <div
      style={{
        '--label-width': `${labelWidthPercent}%`,
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
        onSubmit={(vals) => alert(JSON.stringify(vals, null, 2))}
        onSimplifiedNavigation={(navigation) => {
          console.log('Simplified navigation:', navigation);
        }}
      />
    </div>
  );
} 