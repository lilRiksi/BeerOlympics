import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BracketPage from './pages/BracketPage';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BracketPage />
  </StrictMode>,
);
