export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <img className="contact-wave" src="/media/contactWave.png" alt="" />
      <div className="section-container">
        <h2>You have an <span>idea?</span><br />Speak your <span>mind.</span></h2>
        <div className="contact-links">
          <a href="mailto:beerolympicss@gmail.com">✉<strong>beerolympicss@gmail.com</strong></a>
          <a href="https://www.facebook.com/profile.php?id=61588552880800" target="_blank" rel="noreferrer">f<strong>Beer Olympics</strong></a>
          <a href="https://www.instagram.com/beerolympics.official/" target="_blank" rel="noreferrer">◎<strong>beerolympics.official</strong></a>
          <div>☎<strong>+389 72 565 878</strong></div>
        </div>
        <form className="contact-form" method="POST" action="https://submit-form.com/v6fTCYtkG">
          <div className="contact-form__row">
            <label>Name<input type="text" name="name" required placeholder="Name…" /></label>
            <label>E-mail<input type="email" name="email" required placeholder="E-mail…" /></label>
          </div>
          <label>Message<textarea name="message" required rows="8" placeholder="Message…" /></label>
          <button className="button button--light" type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
