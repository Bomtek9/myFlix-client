import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import './index.scss';

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <MainView /> {/* Include the MainView component */}
        </div>
    );
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);




