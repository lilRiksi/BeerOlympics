import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PrizePoolPage from './pages/PrizePoolPage';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrizePoolPage />
  </StrictMode>,
);
