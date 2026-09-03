import { useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import '../styles/ownthemoment.css';

const VOTED_KEY = 'beerOlympicsMomentVotes';
const LIKES_KEY = 'beerOlympicsMomentLikes';
const LOCAL_MOMENTS_KEY = 'beerOlympicsLocalMomentPhotos';

function getStoredValue(key, fallback) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(fallback));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export default function OwnTheMomentPage() {
  const [submissions, setSubmissions] = useState(() => getStoredValue(LOCAL_MOMENTS_KEY, []));
  const [voted, setVoted] = useState(() => getStoredValue(VOTED_KEY, []));
  const [likes, setLikes] = useState(() => getStoredValue(LIKES_KEY, {}));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);

  const vote = async (id) => {
    if (voted.includes(id)) return;

    const nextVoted = [...voted, id];
    setVoted(nextVoted);
    window.localStorage.setItem(VOTED_KEY, JSON.stringify(nextVoted));

    try {
      const response = await fetch(`/api/moment-likes/${id}/like`, { method: 'POST' });
      const data = await response.json();
      setLikes(data);
    } catch {
      const nextLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
      setLikes(nextLikes);
      window.localStorage.setItem(LIKES_KEY, JSON.stringify(nextLikes));
    }
  };

  const addPhoto = (event) => {
    event.preventDefault();
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = () => {
      const nextSubmissions = [{
        id: `local-${Date.now()}`,
        title: title.trim() || 'New Submission',
        img: reader.result,
      }, ...submissions];
      setSubmissions(nextSubmissions);
      window.localStorage.setItem(LOCAL_MOMENTS_KEY, JSON.stringify(nextSubmissions));
      setTitle('');
      setPhoto(null);
      setIsModalOpen(false);
    };
    reader.readAsDataURL(photo);
  };

  return (
    <div className="moment-page">
      <Navbar alwaysScrolled />
      <main className="moment-container">
        <section className="moment-header">
          <h1>Own <span>The Moment</span></h1>
          <p>Vote for the photo that captured the best Beer Olympics<sup>™</sup> moment.</p>
        </section>

        <section className="moment-rules">
          <h2>Rules</h2>
          <div className="rules-grid">
            <p>Own a Beer Olympics<sup>™</sup> T-shirt.</p>
            <p>Take a photo with at least 2 people.</p>
            <p>Post it on your Instagram story.</p>
            <p>Tag @beerolympics.official.</p>
            <p>Use #OwnTheMoment.</p>
            <p>The winner is selected by voting.</p>
          </div>
        </section>

        <section className="moment-submissions">
          <div className="moment-submissions-header">
            <h2>Photo Submissions</h2>
            <button className="add-photo-btn" type="button" onClick={() => setIsModalOpen(true)}>Add Photo</button>
          </div>
          {submissions.length ? <div className="moment-grid">
            {submissions.map((submission) => {
              const hasVoted = voted.includes(submission.id);
              return <article className="moment-card" key={submission.id}>
                <span className="moment-rank">{submission.title}</span>
                <img src={submission.img} alt={submission.title} />
                <div className="moment-card-body">
                  <h3>{submission.title}</h3>
                  <button className={`like-btn ${hasVoted ? 'liked' : ''}`} type="button" onClick={() => vote(submission.id)} disabled={hasVoted}>
                    <span>Like</span><strong>{likes[submission.id] || 0}</strong>
                  </button>
                </div>
              </article>;
            })}
          </div> : <p className="moment-empty">No photo submissions yet.</p>}
        </section>
      </main>

      {isModalOpen && <div className="add-photo-modal" role="presentation" onMouseDown={() => setIsModalOpen(false)}>
        <section className="add-photo-content" role="dialog" aria-modal="true" aria-label="Add your photo" onMouseDown={(event) => event.stopPropagation()}>
          <button className="add-photo-close" type="button" aria-label="Close" onClick={() => setIsModalOpen(false)}>×</button>
          <h2>Add Your Photo</h2>
          <p>Add a photo submission for voting.</p>
          <form onSubmit={addPhoto}>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Submission title" required />
            <input type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] || null)} required />
            <button className="add-photo-submit" type="submit">Add Photo</button>
          </form>
        </section>
      </div>}
      <SiteFooter />
    </div>
  );
}
