import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import '../styles/prizepool.css';

const pongAwards = [
  { place: 'First Place', medal: '🥇', items: ['Trophy 🏆', 'Gold Medals 🥇', 'Beer Olympics™ T-Shirts', '12,000 MKD 💵'], className: 'gold' },
  { place: 'Second Place', medal: '🥈', items: ['Silver Medals 🥈', '8,000 MKD 💵'], className: 'silver' },
  { place: 'Third Place', medal: '🥉', items: ['Bronze Medals 🥉', '6,000 MKD 💵'], className: 'bronze' },
];

const lotteryAwards = [
  { place: 'First Prize', name: 'Vodka & Red Bull', image: '/media/vodka-redbull.png', className: 'gold' },
  { place: 'Second Prize', name: 'Jack & Cola', image: '/media/jack-cola.png', className: 'silver' },
  { place: 'Third Prize', name: 'Gin & Tonic', image: '/media/gin-tonic.png', className: 'bronze' },
];

function SectionTitle({ children }) {
  return <h2 className="prize-pool__section-title">{children}</h2>;
}

export default function PrizePoolPage() {
  return (
    <div className="prize-pool">
      <Navbar alwaysScrolled />
      <main>
        <header className="prize-pool__heading">
          <p>Beer Olympics<sup>™</sup></p>
          <h1>Prize Pool</h1>
          <span>The Official Beer Olympics<sup>™</sup> VI Prize Pool.</span>
        </header>

        <section className="prize-pool__section">
          <div className="prize-pool__game-heading">
            <img src="/media/beerPong.png" alt="Beer Pong Duos" />
            <div><SectionTitle>Beer Pong Duos Awards 🍻</SectionTitle><p>Champions receive:</p></div>
          </div>
          <div className="prize-pool__podium">
            {pongAwards.map((award) => <article className={`prize-pool__award prize-pool__award--${award.className}`} key={award.place}>
              <span className="prize-pool__medal">{award.medal}</span>
              <h3>{award.place}</h3>
              <ul>{award.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>)}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}><a className="button" href="/#rules-pong">View Rules</a></div>
        </section>

        <section className="prize-pool__section prize-pool__section--moment">
          <div className="prize-pool__game-heading">
            <img src="/media/polaroid.png" alt="Own The Moment" />
            <div><SectionTitle>Own The Moment Awards 📸</SectionTitle><p>Winners receive a bottle of alcohol of their choice.</p></div>
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}><a className="button" href="/#rules-moment">View Rules</a></div>
        </section>

        <section className="prize-pool__section">
          <div className="prize-pool__game-heading">
            <img src="/media/Beer Olympics Lottery.jpg" alt="Beer Olympics Lottery" />
            <div><SectionTitle>Beer Olympics<sup>™</sup> Lottery Awards 🎟️</SectionTitle></div>
          </div>
          <div className="prize-pool__podium">
            {lotteryAwards.map((award) => <article className={`prize-pool__award prize-pool__award--${award.className}`} key={award.place}>
              <h3>{award.place}</h3>
              <img className="prize-pool__drink" src={award.image} alt={award.name} />
              <p>{award.name}</p>
            </article>)}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}><a className="button" href="/#rules-lottery">View Rules</a></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
