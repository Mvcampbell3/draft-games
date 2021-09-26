import React from 'react';
// Pages
import { LandingPage } from './components/pages';

// firebase
import firebase from './firebase';

const App = () => {

    const test = firebase.getApps();
    console.log({test: test[0]._options})


    return ( 
        <div className="app-container">
            <h1>This is the app container</h1>
            <LandingPage />
        </div>
     );
}
 
export default App;