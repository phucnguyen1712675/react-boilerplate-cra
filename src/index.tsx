import React from 'react';
import ReactDOM from 'react-dom';

import 'index.css';
import App from 'App';
// Initialize languages
import 'locales/i18n';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  MOUNT_NODE
);
