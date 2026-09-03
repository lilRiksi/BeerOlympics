import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import OwnTheMomentPage from './pages/OwnTheMomentPage';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OwnTheMomentPage />
  </StrictMode>,
);
