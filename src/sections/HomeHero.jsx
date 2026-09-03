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
  if (!timeLeft) {
    return (
      <div className="event-status">
        <p className="countdown-ended">The event date has passed.</p>
        <div className="event-status__links">
          <a className="button" href="/halloffame.html#year-2026">See Winners</a>
          <a className="button" href="/gallery.html#2026">View Gallery</a>
        </div>
      </div>
    );
  }
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
        <div className="event-details" aria-label="Event details">
          <p><strong>23.07.2026</strong></p>
          <p>Leona Lux — Radovis</p>
          <p>Starts at 19:00</p>
        </div>
        <Countdown />
      </div>
    </section>
  );
}
