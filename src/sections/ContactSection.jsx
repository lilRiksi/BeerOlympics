export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <img className="contact-wave" src="/media/contactWave.png" alt="" />
      <div className="section-container">
        <h2>You have an <span>idea?</span><br />Speak your <span>mind.</span></h2>
        <div className="contact-links">
          <a href="mailto:beerolympicss@gmail.com">
            <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3z" /><path d="m3 7 9 6 9-6" /></svg>
            <strong>beerolympicss@gmail.com</strong>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61588552880800" target="_blank" rel="noreferrer">
            <svg className="contact-icon contact-icon--filled" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.8 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8.6V13h2.8v8h2.4Z" /></svg>
            <strong>Beer Olympics</strong>
          </a>
          <a href="https://www.instagram.com/beerolympics.official/" target="_blank" rel="noreferrer">
            <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="1" className="contact-icon__dot" /></svg>
            <strong>beerolympics.official</strong>
          </a>
          <div>
            <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.8 8.5 3l1.7 4.4-2.1 1.7a15.4 15.4 0 0 0 6.8 6.8l1.7-2.1L21 15.5l-.8 3.3a2.6 2.6 0 0 1-2.7 2A16.8 16.8 0 0 1 3.2 6.5a2.6 2.6 0 0 1 2-2.7Z" /></svg>
            <strong>+389 72 565 878</strong>
          </div>
        </div>
        <form className="contact-form" method="POST" action="https://submit-form.com/v6fTCYtkG">
          <div className="contact-form__row">
            <label>Name<input type="text" name="name" required placeholder="Name..." /></label>
            <label>E-mail<input type="email" name="email" required placeholder="E-mail..." /></label>
          </div>
          <label>Message<textarea name="message" required rows="8" placeholder="Message..." /></label>
          <button className="button button--light" type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
