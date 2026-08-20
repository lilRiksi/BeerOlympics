import { useEffect } from 'react';

export default function Modal({ isOpen, title, heroImage, children, onClose, className = '' }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.classList.add('is-modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('is-modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`modal-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label="Close modal" onClick={onClose}>×</button>
        {heroImage && <img className="modal-hero" src={heroImage} alt="" />}
        <div className="modal-body">
          <h2 id="modal-title">{title}</h2>
          {children}
        </div>
      </section>
    </div>
  );
}
