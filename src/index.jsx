import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { Container } from "react-bootstrap";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Container>
      <div className="my-flix">
        <MainView /> {/* Include the MainView component */}
      </div>
    </Container>
  );
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);
