import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './providers/ThemeProvider';
import { LocaleProvider } from './providers/LocaleProvider';
import { MotionProvider } from './providers/MotionProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <MotionProvider>
          <App />
        </MotionProvider>
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>
);
