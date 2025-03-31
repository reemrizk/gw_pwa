import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import PhotoButton from './PhotoButton';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const App = () => {
  // To listen to route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.swUpdateReady) {
        window.swUpdateReady = false;
        window.stop();
        window.location.reload();
      }
    };

    // Listen for changes in the browser history
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup to remove listener on unmount
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <h1>GreenWorks Device Manager 1.1</h1>
      <PhotoButton />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Register service worker for PWA
serviceWorkerRegistration.register();
reportWebVitals();
