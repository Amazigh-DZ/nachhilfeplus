import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import faviconImage from '../images/nachhilfe-plus-logo-quadratisch-removebg-2.png';

const faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

if (faviconLink) {
  faviconLink.href = faviconImage;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
