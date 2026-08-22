const API_BASE_URL = '/api';
const COMMENTS_STORAGE_KEY = 'beer-olympics-comments';

async function request(path = '', options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.msg || data.error || 'The server could not process the request.');
  }
  return data;
}

export function registerTeam(payload) {
  return request('', { method: 'POST', body: JSON.stringify(payload) });
}

export function getComments() {
  try {
    const savedComments = window.localStorage.getItem(COMMENTS_STORAGE_KEY);
    const comments = savedComments ? JSON.parse(savedComments) : [];
    return Array.isArray(comments) ? comments : [];
  } catch {
    throw new Error('Comments could not be loaded from this browser.');
  }
}

export function createComment(text) {
  try {
    const comments = getComments();
    const comment = { text, createdAt: new Date().toISOString() };
    window.localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify([...comments, comment]));
    return comment;
  } catch {
    throw new Error('Your comment could not be saved in this browser.');
  }
}
