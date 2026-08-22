import { useState } from 'react';
import { createComment, getComments } from '../services/api';

const BUBBLE_COUNT = 10;

export default function CommentsSection() {
  const [comments, setComments] = useState(() => {
    try {
      return getComments();
    } catch {
      return [];
    }
  });
  const [error, setError] = useState('');

  const loadComments = () => {
    try {
      setComments(getComments());
      setError('');
    } catch {
      setError('Comments could not be loaded from this browser.');
    }
  };

  const addComment = () => {
    const text = window.prompt('Write your comment (maximum 50 words):');
    if (!text?.trim()) return;
    if (text.trim().split(/\s+/).length > 50) {
      setError('Please keep your comment to 50 words or fewer.');
      return;
    }
    try {
      createComment(text.trim());
      loadComments();
    } catch (requestError) {
      setError(requestError.message || 'Your comment could not be saved.');
    }
  };

  return (
    <section className="comments-section" aria-labelledby="comments-title">
      <h2 id="comments-title">Leave <span>your</span> mark</h2>
      {error && <p className="comments-error" role="status">{error}</p>}
      <div className="comment-bubbles">
        {Array.from({ length: BUBBLE_COUNT }, (_, index) => {
          const comment = comments[index];
          return (
            <button
              className={`comment-bubble ${comment ? 'comment-bubble--used' : ''}`}
              key={index}
              type="button"
              onClick={comment ? undefined : addComment}
              disabled={Boolean(comment)}
            >
              {comment?.text || 'Leave a comment'}
            </button>
          );
        })}
      </div>
    </section>
  );
}
