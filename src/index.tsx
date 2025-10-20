import React from 'react';
import ReactDOM from 'react-dom/client';
import '@vritti/quantum-ui/dist/assets/quantum-ui.css';
import App from './App';
import './index.css';
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
