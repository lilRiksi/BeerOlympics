const API_BASE_URL = '/api';

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
  return request('/comments');
}

export function createComment(text) {
  return request('/comments', { method: 'POST', body: JSON.stringify({ text }) });
}
