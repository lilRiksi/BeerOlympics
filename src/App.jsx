import { useState } from 'react';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import AboutSection from './sections/AboutSection';
import CommentsSection from './sections/CommentsSection';
import ContactSection from './sections/ContactSection';
import GameFeature from './sections/GameFeature';
import HomeHero from './sections/HomeHero';
import TeamRegistrationForm from './features/registration/TeamRegistrationForm';
import { games } from './data/site';

const emailJsConfig = {
  serviceId: 'service_fqw8lii',
  templateId: 'template_d44m8x9',
  // Add a public key when configuring EmailJS in the new React project.
  publicKey: '',
};

export default function App() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <Navbar />
      <main>
        <HomeHero onRegister={() => setActiveModal('register')} />
        <AboutSection />
        {games.map((game) => (
          <GameFeature
            key={game.id}
            game={game}
            onLearnMore={() => setActiveModal(game.id)}
          />
        ))}
        <CommentsSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <p>Copyright © 2026 | Beer Olympics<sup>™</sup></p>
      </footer>

      <Modal
        isOpen={activeModal === 'register'}
        title="Register your team"
        onClose={() => setActiveModal(null)}
        className="registration-modal"
      >
        <TeamRegistrationForm emailJsConfig={emailJsConfig} />
      </Modal>

      {games.map((game) => (
        <Modal
          key={game.id}
          isOpen={activeModal === game.id}
          title={game.modalTitle}
          onClose={() => setActiveModal(null)}
          heroImage={game.modalImage}
        >
          <div className="info-modal-content">
            {game.rules.map((rule) => <p key={rule}>{rule}</p>)}
            {game.modalLink && (
              <a className="button" href={game.modalLink.href}>
                {game.modalLink.label}
              </a>
            )}
          </div>
        </Modal>
      ))}
    </>
  );
}
