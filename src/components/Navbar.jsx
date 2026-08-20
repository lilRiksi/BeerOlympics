import { useEffect, useState } from 'react';
import { navItems } from '../data/site';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-nav ${isScrolled ? 'site-nav--scrolled' : ''}`}>
      <nav className="nav-container" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Beer Olympics home">
          <img src="/media/logo.png" alt="Beer Olympics" />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
        <div className={`nav-links ${isOpen ? 'nav-links--open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
          ))}
          <a className="language-link" href="/mk.html" onClick={() => setIsOpen(false)}>MK</a>
        </div>
      </nav>
    </header>
  );
}
