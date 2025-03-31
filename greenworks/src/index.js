import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import PhotoButton from './PhotoButton';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Navbar />
    <h1>GreenWorks Device Manager 3.5</h1>
    <div id="custom-refresh-bar" style="display: none;">
  A new version is available. <button onclick="window.location.reload()">Refresh</button>
</div>

    <PhotoButton />
  </div>
);


serviceWorkerRegistration.register();

reportWebVitals();

