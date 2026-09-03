import { useEffect, useState } from 'react';

function loadTagCanvas() {
  if (window.TagCanvas) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-tag-canvas]');
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = '/tagcanvas.min.js';
    script.async = true;
    script.dataset.tagCanvas = 'true';
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

export default function useTagCanvas() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let disposed = false;
    loadTagCanvas()
      .then(() => {
        if (disposed || !window.TagCanvas) return;
        try {
          window.TagCanvas.Start('tag-canvas', 'tag-list', {
            outlineColour: '#fafafa00',
            depth: 0.7,
            maxSpeed: 0.03,
            imageMode: 'image',
            imageScale: 0.12,
            minBrightness: 0.5,
            noMouse: true,
            noSelect: true,
            zoom: 1,
            maxZoom: 1,
            minZoom: 1,
          });
          window.TagCanvas.SetSpeed('tag-canvas', [-0.15, 0.1]);
          setIsActive(true);
        } catch (error) {
          console.error('Tag cloud failed to initialize:', error);
        }
      })
      .catch(() => console.warn('TagCanvas is unavailable. Copy tagcanvas.min.js to public/.'));
    return () => {
      disposed = true;
      setIsActive(false);
      try { window.TagCanvas?.Delete('tag-canvas'); } catch { /* library cleanup is optional */ }
    };
  }, []);

  return isActive;
}
