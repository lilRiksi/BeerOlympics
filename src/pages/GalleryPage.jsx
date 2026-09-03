import { useCallback, useEffect, useRef, useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import { galleryEvents } from '../data/galleryEvents';
import '../styles/gallery.css';

const GALLERY_PATH = '/media/gallery-optimized/';
const PHOTOS_PER_BATCH = 72;

function EventTitle({ title }) {
  const eventName = 'Beer Olympics';
  if (!title.startsWith(eventName)) return title;
  return <>{eventName}<sup>™</sup><span>{title.slice(eventName.length)}</span></>;
}

export default function GalleryPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeEventId, setActiveEventId] = useState('2023');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_BATCH);
  const loadMoreRef = useRef(null);
  const activeEvent = galleryEvents.find((event) => event.id === activeEventId) || galleryEvents[0];
  const selectedPhoto = selectedIndex === null ? null : activeEvent.photos[selectedIndex];

  const closeMenu = () => setMenuOpen(false);
  const selectEvent = (id) => {
    setActiveEventId(id);
    setSelectedIndex(null);
    setVisibleCount(PHOTOS_PER_BATCH);
  };
  const movePhoto = useCallback(
    (direction) => setSelectedIndex((index) => (index + direction + activeEvent.photos.length) % activeEvent.photos.length),
    [activeEvent.photos.length],
  );

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= activeEvent.photos.length) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisibleCount((count) => Math.min(count + PHOTOS_PER_BATCH, activeEvent.photos.length));
      }
    }, { rootMargin: '600px 0px' });

    observer.observe(target);
    return () => observer.disconnect();
  }, [activeEvent.photos.length, activeEventId, visibleCount]);

  useEffect(() => {
    if (selectedIndex === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') movePhoto(-1);
      if (event.key === 'ArrowRight') movePhoto(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, movePhoto]);

  const visiblePhotos = activeEvent.photos.slice(0, visibleCount);

  return (
    <div className="gallery-page">
      <header className="gallery-nav">
        <nav className="gallery-nav__inner" aria-label="Primary navigation">
          <a className="gallery-nav__brand" href="/#home" aria-label="Beer Olympics home"><img src="/media/logo.png" alt="Beer Olympics" /></a>
          <button className="gallery-nav__menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
          <div className={`gallery-nav__links ${menuOpen ? 'gallery-nav__links--open' : ''}`}>
            <a href="/#about" onClick={closeMenu}>About</a><a href="/#games" onClick={closeMenu}>Games</a><a href="/tickets.html" onClick={closeMenu}>Tickets</a><a href="/t-shirts.html" onClick={closeMenu}>T-Shirts</a><a href="/halloffame.html" onClick={closeMenu}>Hall of Fame</a><a href="/#contact" onClick={closeMenu}>Contact</a>
          </div>
        </nav>
      </header>
      <main>
        <section className="gallery-page__intro"><p>Beer Olympics<sup>™</sup></p><h1>Gallery</h1><span>Choose an event to see the photos.</span></section>
        <section className="gallery-page__events" aria-label="Gallery events">
          {galleryEvents.map((event) => <button type="button" key={event.id} className={event.id === activeEventId ? 'is-active' : ''} onClick={() => selectEvent(event.id)}><EventTitle title={event.title} /></button>)}
        </section>
        <section className="gallery-page__photos" aria-live="polite">
          <h2><EventTitle title={activeEvent.title} /></h2>
          {activeEvent.photos.length > 0 ? <>
            <div className="gallery-page__grid">
              {visiblePhotos.map((photo, index) => <button type="button" key={photo} className="gallery-page__photo" onClick={() => setSelectedIndex(index)}><img src={`${GALLERY_PATH}${photo}`} alt={`${activeEvent.title} photo ${index + 1}`} loading="lazy" decoding="async" /></button>)}
            </div>
            {visibleCount < activeEvent.photos.length && <div className="gallery-page__load-more" ref={loadMoreRef} style={{ height: 1 }} aria-label="Loading more photos" />}
          </> : <p className="gallery-page__empty">Photos from this event will be added soon.</p>}
        </section>
      </main>
      <SiteFooter className="gallery-page__footer" />
      {selectedPhoto && <div className="gallery-lightbox" role="presentation" onMouseDown={() => setSelectedIndex(null)}><section role="dialog" aria-modal="true" aria-label={`${activeEvent.title} photo ${selectedIndex + 1}`} onMouseDown={(event) => event.stopPropagation()}><button className="gallery-lightbox__close" type="button" aria-label="Close photo" onClick={() => setSelectedIndex(null)}>×</button><img src={`${GALLERY_PATH}${selectedPhoto}`} alt={`${activeEvent.title} photo ${selectedIndex + 1}`} /><button className="gallery-lightbox__arrow gallery-lightbox__arrow--left" type="button" aria-label="Previous photo" onClick={() => movePhoto(-1)}>❮</button><button className="gallery-lightbox__arrow gallery-lightbox__arrow--right" type="button" aria-label="Next photo" onClick={() => movePhoto(1)}>❯</button></section></div>}
    </div>
  );
}
