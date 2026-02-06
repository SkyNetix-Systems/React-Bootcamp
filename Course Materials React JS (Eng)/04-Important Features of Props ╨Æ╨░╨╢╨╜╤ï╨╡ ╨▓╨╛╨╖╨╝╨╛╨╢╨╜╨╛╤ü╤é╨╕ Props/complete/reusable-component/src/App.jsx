import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Instruction from "./components/Instruction";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Button from "./components/Button";

function App() {
  const [showInstructions, setShowInstructions] = useState(false);

  function toggleInstructions() {
    setShowInstructions((prev) => !prev);
  }

  function handleClick() {
    alert("Click");
  }

  return (
    <div className="app">
      <Header showInstructions={showInstructions} toggleInstructions={toggleInstructions} />
      <Instruction showInstructions={showInstructions} />
      <Main>
        <Section title="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="outline">Outline</Button>
        </Section>

        <Section title="Sizes">
          <Button variant="primary" size="large">
            Large
          </Button>
          <Button variant="primary" size="medium">
            Medium
          </Button>
          <Button variant="primary" size="small">
            Small
          </Button>
        </Section>

        <Section title="Button Statets">
          <Button isDisabled>Disabled</Button>
          <Button>Default</Button>
        </Section>

        <Section title="Full Width Button">
          <Button fullWidth>FULL WIDTH</Button>
        </Section>

        <Section title="With Fn">
          <Button variant="primary" onClick={handleClick}>
            Click me
          </Button>
        </Section>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
