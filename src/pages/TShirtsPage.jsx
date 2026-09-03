import { useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import { preorderTshirt } from '../services/api';
import '../styles/tshirts.css';

export default function TShirtsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const openPreorder = () => {
    setFormStatus({ type: '', message: '' });
    setModalOpen(true);
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = { ...Object.fromEntries(form.entries()), color: 'Beer Olympics T-Shirt' };
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });
    try {
      await preorderTshirt(payload);
      event.currentTarget.reset();
      setFormStatus({ type: 'success', message: 'Preorder sent. Check your email for confirmation.' });
    } catch (error) {
      setFormStatus({ type: 'error', message: error.message || 'Could not send preorder.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tshirts-page">
      <header className="tshirts-nav">
        <nav className="tshirts-nav__inner" aria-label="Primary navigation">
          <a className="tshirts-nav__brand" href="/#home" aria-label="Beer Olympics home"><img src="/media/logo.png" alt="Beer Olympics" /></a>
          <button className="tshirts-nav__menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
          <div className={`tshirts-nav__links ${menuOpen ? 'tshirts-nav__links--open' : ''}`}>
            <a href="/#about" onClick={closeMenu}>About</a><a href="/#games" onClick={closeMenu}>Games</a><a href="/bracket.html" onClick={closeMenu}>Brackets</a><a href="/tickets.html" onClick={closeMenu}>Tickets</a><a href="/halloffame.html" onClick={closeMenu}>Hall of Fame</a><a href="/gallery.html" onClick={closeMenu}>Gallery</a><a href="/#contact" onClick={closeMenu}>Contact</a>
          </div>
        </nav>
      </header>
      <main>
        <section className="tshirts-page__heading" aria-labelledby="tshirts-title"><p>Beer Olympics<sup>™</sup></p><h1 id="tshirts-title">T-Shirts</h1></section>
        <section className="tshirts-page__display" aria-label="Beer Olympics T-Shirt"><article className="tshirts-page__card"><img src="/media/T-shirt 1.png" alt="Beer Olympics T-Shirt" /></article></section>
        <section className="tshirts-page__description"><p>The official Beer Olympics T-Shirt is more than just merchandise. Wear it proudly and represent your team during the event.</p><p className="tshirts-page__requirement"><span aria-hidden="true">*</span> Owning a Beer Olympics T-Shirt is required to participate in the <a href="/#moment">"Own The Moment"</a> competition.</p></section>
        <div className="tshirts-page__preorder"><button type="button" onClick={openPreorder}>Preorder Now</button></div>
      </main>
      <SiteFooter className="tshirts-page__footer" />
      {modalOpen && <div className="tshirts-modal-backdrop" role="presentation" onMouseDown={() => setModalOpen(false)}><section className="tshirts-modal" role="dialog" aria-modal="true" aria-labelledby="tshirts-modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="tshirts-modal__close" type="button" aria-label="Close preorder form" onClick={() => setModalOpen(false)}>×</button><div className="tshirts-modal__content"><h2 id="tshirts-modal-title">Pre-Order Beer Olympics T-Shirt</h2><p className="tshirts-modal__price">Price: 400 MKD</p><form className="tshirts-modal__form" onSubmit={submitOrder}><input name="firstName" type="text" placeholder="Name" required /><input name="lastName" type="text" placeholder="Surname" required /><input name="email" type="email" placeholder="Email" required /><select name="size" required defaultValue=""><option value="" disabled>Select Size</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option></select>{formStatus.message && <p className={`tshirts-modal__message tshirts-modal__message--${formStatus.type}`} role="status">{formStatus.message}</p>}<button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Order'}</button></form></div></section></div>}
    </div>
  );
}
