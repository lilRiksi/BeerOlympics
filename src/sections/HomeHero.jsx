import { useEffect, useState } from 'react';
import { eventDate } from '../data/site';

function getTimeLeft() {
  const difference = new Date(eventDate).getTime() - Date.now();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1_000);
    return () => window.clearInterval(timer);
  }, []);
  if (!timeLeft) return <p className="countdown-ended">The event date has passed.</p>;
  return (
    <div className="countdown" aria-label="Time left until the event">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>
      ))}
    </div>
  );
}

export default function HomeHero({ onRegister }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <div className="hero-copy__inner">
          <h1>Only one <em>team</em> takes the <em>crown</em>.<br />Will it be <em>yours?</em></h1>
          <button className="button" type="button" onClick={onRegister}>Register</button>
        </div>
      </div>
      <div className="hero-wave" aria-hidden="true">
        <img className="hero-wave__large" src="/media/wave.png" alt="" />
        <img className="hero-wave__small" src="/media/waveSmall.png" alt="" />
      </div>
      <div className="hero-showcase">
        <h2>Beer Olympics<sup>™</sup><span>VI</span></h2>
        <Countdown />
      </div>
    </section>
  );
}
