import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GalleryPage from './pages/GalleryPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GalleryPage />
  </StrictMode>,
);
