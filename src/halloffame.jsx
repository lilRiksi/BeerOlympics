import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HallOfFamePage from './pages/HallOfFamePage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HallOfFamePage />
  </StrictMode>,
);
