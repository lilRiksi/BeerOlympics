import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LotteryPage from './pages/LotteryPage';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LotteryPage />
  </StrictMode>,
);
