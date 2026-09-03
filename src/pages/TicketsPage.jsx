import { useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import '../styles/tickets.css';

const ticketOptions = [
  { name: <>Regular<br />Ticket</>, price: '300 MKD', perks: ['🎟️ Entry'] },
  { name: <>Competitive<br />Ticket</>, price: '1200 MKD', perks: ['🎟️ Entry', '🏆 Beer Pong Duos'] },
];

const bundles = [
  { name: 'Places To Be', price: '700 MKD', perks: ['🎟️ Regular Ticket', '👕 T-Shirt', '🍺 Beer'] },
  { name: 'Victory Lap', price: '2000 MKD', perks: ['🏆 Competitive Ticket', '👕 T-Shirt', '🍺 Beer'], featured: true },
];

function TicketCard({ name, price, perks, featured = false }) {
  return (
    <article className={`ticket-card ${featured ? 'ticket-card--featured' : ''}`}>
      {featured && <span className="ticket-card__badge">Best value</span>}
      <h3>{name}</h3>
      <p className="ticket-card__price">{price}</p>
      <ul className="ticket-card__perks">
        {perks.map((perk) => <li key={perk}>{perk}</li>)}
      </ul>
    </article>
  );
}

export default function TicketsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="tickets-page">
      <header className="tickets-nav">
        <nav className="tickets-nav__inner" aria-label="Primary navigation">
          <a className="tickets-nav__brand" href="/#home" aria-label="Beer Olympics home">
            <img src="/media/logo.png" alt="Beer Olympics" />
          </a>
          <button
            className="tickets-nav__menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span /><span /><span />
          </button>
          <div className={`tickets-nav__links ${menuOpen ? 'tickets-nav__links--open' : ''}`}>
            <a href="/#about" onClick={closeMenu}>About</a>
            <a href="/#games" onClick={closeMenu}>Games</a>
            <a href="/t-shirts.html" onClick={closeMenu}>T-Shirts</a>
            <a href="/halloffame.html" onClick={closeMenu}>Hall of Fame</a>
            <a href="/gallery.html" onClick={closeMenu}>Gallery</a>
            <a href="/#contact" onClick={closeMenu}>Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="tickets-page__heading" aria-labelledby="tickets-title">
          <p>Beer Olympics<sup>™</sup></p>
          <h1 id="tickets-title">Tickets</h1>
        </section>
        <section className="tickets-page__section" aria-label="Ticket options">
          <div className="tickets-page__cards">
            {ticketOptions.map((ticket) => <TicketCard key={ticket.price} {...ticket} />)}
          </div>
        </section>

        <section className="tickets-page__heading tickets-page__heading--bundles" aria-labelledby="bundles-title">
          <p>Beer Olympics<sup>™</sup></p>
          <h2 id="bundles-title">Bundles</h2>
        </section>
        <section className="tickets-page__section">
          <div className="tickets-page__cards">
            {bundles.map((bundle) => <TicketCard key={bundle.name} {...bundle} />)}
          </div>
          <div className="tickets-page__buy">
            <a
              className="tickets-page__buy-button"
              href="https://fienta.com/mk/beer-olympics-2?016c2cb275e227d9968263f6a0c7e18a="
              target="_blank"
              rel="noreferrer"
            >
              🎟️ Buy Tickets
            </a>
          </div>
        </section>
      </main>
      <SiteFooter className="tickets-page__footer" />
    </div>
  );
}
