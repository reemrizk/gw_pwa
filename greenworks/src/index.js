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
    <h1>GreenWorks Device Manager 2</h1>
    <PhotoButton />
  </div>
);


serviceWorkerRegistration.register();

reportWebVitals();
