import useTagCanvas from '../hooks/useTagCanvas';
import { tagCloudImages } from '../data/site';

export default function AboutSection() {
  const isTagCanvasActive = useTagCanvas();
  return (
    <section id="about" className="about-section section-container">
      <div className="about-copy">
        <p className="about-lede">You, your friends, a bunch of beer, and a lot of fun! The time has come for the sixth annual <em>Beer Olympics™</em>.</p>
        <p>We are giving you the opportunity to attend the newest edition of Beer Olympics, the future&apos;s greatest event. Our goal is to get people together, listen to good music, party hard and, of course, drink a lot of beer.</p>
        <p><em>Beer Olympics™ VI</em> — another shot at glory, laughter, and unforgettable memories. Come celebrate with us, compete for epic prizes, and make new memories.</p>
      </div>
      <div className={`tag-cloud ${isTagCanvasActive ? 'tag-cloud--canvas-active' : ''}`} aria-label="Beer Olympics photo cloud">
        <canvas id="tag-canvas" width="1000" height="1000" />
        <div className="tag-cloud__fallback" aria-hidden={isTagCanvasActive}>
          {tagCloudImages.slice(0, 8).map((image) => <img key={image} src={image} alt="" />)}
        </div>
        <ul id="tag-list" aria-hidden="true">
          {tagCloudImages.map((image) => <li key={image}><img src={image} alt="" /></li>)}
        </ul>
      </div>
    </section>
  );
}
