import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TShirtsPage from './pages/TShirtsPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TShirtsPage />
  </StrictMode>,
);
