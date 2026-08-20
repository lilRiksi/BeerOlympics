import { useState } from 'react';
import { registerTeam } from '../../services/api';

function validate(values) {
  if (!values.name) return 'Please enter your full name.';
  if (values.name.trim().split(/\s+/).length < 2) return 'Please enter your first and last name.';
  if (!values.teammate) return "Please enter your teammate's name.";
  if (values.teammate.trim().split(/\s+/).length < 2) return "Please enter your teammate's first and last name.";
  if (!values.team) return "Please enter your team's name.";
  return '';
}

function sendEmailConfirmation(data, config) {
  if (!config.publicKey || !window.emailjs) return;
  window.emailjs.init(config.publicKey);
  window.emailjs.send(config.serviceId, config.templateId, {
    first_person: data.firstPerson,
    teammate: data.teammate,
    team: data.teamName,
  }).catch((error) => console.error('EmailJS confirmation failed:', error));
}

export default function TeamRegistrationForm({ emailJsConfig }) {
  const [values, setValues] = useState({ name: '', teammate: '', team: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleaned = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
    const error = validate(cleaned);
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const result = await registerTeam({ ...cleaned, pong: true });
      if (!result.success) throw new Error(result.msg || 'Registration failed.');
      setStatus({ type: 'success', message: result.msg });
      setValues({ name: '', teammate: '', team: '' });
      sendEmailConfirmation(result, emailJsConfig);
    } catch (requestError) {
      setStatus({ type: 'error', message: requestError.message || 'Could not connect to the server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit} noValidate>
      <label>Your name
        <input name="name" value={values.name} onChange={updateValue} placeholder="Enter your full name" />
      </label>
      <label>Teammate
        <input name="teammate" value={values.teammate} onChange={updateValue} placeholder="Enter your teammate's full name" />
      </label>
      <label>Team name
        <input name="team" value={values.team} onChange={updateValue} placeholder="Enter your team's name" />
      </label>
      {status.message && <p className={`form-message form-message--${status.type}`} role="status">{status.message}</p>}
      <button className="button button--dark" disabled={isSubmitting}>
        {isSubmitting ? 'Loading…' : 'Submit'}
      </button>
    </form>
  );
}
