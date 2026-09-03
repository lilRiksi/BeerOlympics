import { useEffect, useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import '../styles/halloffame.css';

const years = [
  { year: '2027', first: [{ image: 'question.webp', name: 'This could be you...' }], second: [], third: [] },
  { year: 'Beer Olympics VI', first: [{ image: 'koce2026.jpg', name: 'Konstantin Vasilev', mvp: true }, { image: 'dragan2026.jpg', name: 'Dragan Petrusev' }], second: [{ image: 'matej2026.jpg', name: 'Matej Filipov' }, { image: 'luka2026.jpg', name: 'Luka Filipov' }], third: [{ image: 'ivan2026.jpg', name: 'Ivan Mladenovski' }, { image: 'spase2026.jpg', name: 'Spase Arsov' }] },
  { year: 'Beer Olympics "The Last Dance"', first: [{ image: 'spirkoski2025.webp', name: 'Viktor Spirkoski', mvp: true }, { image: 'andrej2025.webp', name: 'Andrej Delimanchev' }], second: [{ image: 'direktor.webp', name: 'Riste Trajkov' }, { image: 'barbara2025.webp', name: 'Barbara Avramova' }], third: [{ image: 'simon2025.webp', name: 'Simon Prangovski' }, { image: 'viktor2025.webp', name: 'Viktor Trajkov' }] },
  { year: 'Beer Olympics 4.0', first: [{ image: 'luka2024.webp', name: 'Luka Trajanov', mvp: true }, { image: 'vane2024.webp', name: 'Vane Stefanov' }], second: [{ image: 'matej2024.webp', name: 'Matej Filipov' }, { image: 'nz2024.webp', name: 'Konstantin Mihajlov' }], third: [{ image: 'mario2024.webp', name: 'Mario Mitev' }, { image: 'encev2024.webp', name: 'Filip Enchev' }] },
  { year: 'Beer Olympics 3.0', first: [{ image: 'manas2023.webp', name: 'Manas Manasov', mvp: true }, { image: 'marko2023.webp', name: 'Marko Stojmenov' }], second: [{ image: 'matej2023.webp', name: 'Matej Filipov' }, { image: 'zorica2023.webp', name: 'Zorica Ristova' }], third: [{ image: 'tijana2023.webp', name: 'Tijana Temelkova' }, { image: 'meri2023.webp', name: 'Meri Vaseva' }] },
  { year: 'Beer Olympics 2.0', first: [{ image: 'matej2022.webp', name: 'Matej Filipov', mvp: true }, { image: 'zorica2022.webp', name: 'Zorica Ristova' }], second: [{ image: 'petar2022.webp', name: 'Petar Gozev' }, { image: 'stanoja2022.webp', name: 'Stanoja Bozinov' }], third: [{ image: 'alek2022.webp', name: 'Alek Trajkov' }, { image: 'vilma2022.webp', name: 'Vilma Dimitrova' }] },
  { year: 'Beer Olympics 1.0', first: [{ image: 'panco2021.webp', name: 'Panche Gogov' }, { image: 'dejana2021.webp', name: 'Dejana Vasileva' }], second: [{ image: 'vasko2021.webp', name: 'Vasko Gorichev', mvp: true }, { image: 'ivona2021.webp', name: 'Ivona Ristevska' }], third: [{ image: 'mila2021.webp', name: 'Mila Angelova' }, { image: 'sara2021.webp', name: 'Sara Taseva' }] },
];

const medals = { 'First place': '🥇', 'Second place': '🥈', 'Third place': '🥉' };

function EventTitle({ title }) {
  const eventName = 'Beer Olympics';
  if (!title.startsWith(eventName)) return title;
  return <>{eventName}<sup>™</sup><span>{title.slice(eventName.length)}</span></>;
}

function WinnerCard({ winner, place }) {
  return <article className="hall-of-fame__card"><img src={`/media/halloffame/${winner.image}`} alt={winner.name} />{place && <p className="hall-of-fame__place">{place}</p>}<p className="hall-of-fame__name">{winner.name}{place && ` ${medals[place]}`}</p>{winner.mvp && <img className="hall-of-fame__mvp" src="/media/halloffame/mvp.png" alt="Most valuable player" />}</article>;
}

function Placement({ place, winners }) {
  if (!winners.length) return null;
  return <div className={`hall-of-fame__placement hall-of-fame__placement--${place.split(' ')[0].toLowerCase()}`}>{winners.map((winner) => <WinnerCard key={winner.name} winner={winner} place={place} />)}</div>;
}

export default function HallOfFamePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
  }, []);

  return (
    <div className="hall-of-fame">
      <header className="hall-nav"><nav className="hall-nav__inner" aria-label="Primary navigation"><a className="hall-nav__brand" href="/#home" aria-label="Beer Olympics home"><img src="/media/logo.png" alt="Beer Olympics" /></a><button className="hall-nav__menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button><div className={`hall-nav__links ${menuOpen ? 'hall-nav__links--open' : ''}`}><a href="/#about" onClick={closeMenu}>About</a><a href="/#games" onClick={closeMenu}>Games</a><a href="/tickets.html" onClick={closeMenu}>Tickets</a><a href="/t-shirts.html" onClick={closeMenu}>T-Shirts</a><a href="/gallery.html" onClick={closeMenu}>Gallery</a><a href="/#contact" onClick={closeMenu}>Contact</a></div></nav></header>
      <main><section className="hall-of-fame__heading"><p>Beer Olympics<sup>™</sup></p><h1>Hall of Fame</h1></section>{years.map((entry) => <section className="hall-of-fame__year" id={entry.year === 'Beer Olympics VI' ? 'year-2026' : undefined} style={entry.year === 'Beer Olympics VI' ? { scrollMarginTop: '5.5rem' } : undefined} key={entry.year} aria-labelledby={`year-${entry.year}`}><h2 id={`year-${entry.year}`}><EventTitle title={entry.year} /></h2><Placement place="First place" winners={entry.first} /><div className="hall-of-fame__lower"><Placement place="Second place" winners={entry.second} /><Placement place="Third place" winners={entry.third} /></div></section>)}</main>
      <SiteFooter className="hall-of-fame__footer" />
    </div>
  );
}
