import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import '../styles/lottery.css';

const prizes = [
  { rank: '1st Prize', name: 'Vodka Red Bull', description: 'First place lottery reward.', image: '/media/vodka-redbull.png', className: 'first' },
  { rank: '2nd Prize', name: 'Jack Cola', description: 'Second place lottery reward.', image: '/media/jack-cola.png', className: 'second' },
  { rank: '3rd Prize', name: 'Gin Tonic', description: 'Third place lottery reward.', image: '/media/gin-tonic.png', className: 'third' },
];

export default function LotteryPage() {
  return (
    <div className="lottery-page">
      <Navbar alwaysScrolled />
      <main className="lottery-container">
        <section className="lottery-header">
          <h1>Beer Olympics<sup>™</sup> <span>Lottery</span></h1>
          <p>Buy a lottery ticket and get a chance to win one of three prizes.</p>
        </section>
        <section className="lottery-prize-grid">
          {prizes.map((prize) => <article className={`lottery-prize-card ${prize.className}`} key={prize.rank}>
            <span className="prize-rank">{prize.rank}</span>
            <img src={prize.image} alt={`${prize.name} prize`} />
            <h2>{prize.name}</h2>
            <p>{prize.description}</p>
          </article>)}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
