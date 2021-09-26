import React, { useState } from "react";
// Pages
import { FirebaseTestingPage, LandingPage } from "./components/pages";

const App = () => {
    const [showLanding, setShowLanding] = useState(true);

    return (
        <div className="app-container">
            <h1>This is the app container</h1>
            <button onClick={() => setShowLanding((prev) => !prev)}>
                Change showLanding
            </button>
            {showLanding ? <LandingPage /> : <FirebaseTestingPage />}
        </div>
    );
};

export default App;
