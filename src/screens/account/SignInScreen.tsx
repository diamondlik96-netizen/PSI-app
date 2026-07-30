import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

export function SignInScreen() {
  const navigate = useNavigate();
  const { signIn, enterDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setError(null);
    setSubmitting(true);
    const result = await signIn(email.trim(), password);
    setSubmitting(false);
    if (result.error) setError(result.error);
  };

  return (
    <div style={{ padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h4 style={{ margin: 0 }}>Customer Sign In</h4>
      <p style={{ margin: 0, fontSize: 13, opacity: 0.65 }}>Access your service history, appointments, and messages with our team.</p>

      {error && (
        <div style={{ background: 'var(--color-accent)', color: '#fff', padding: '10px 12px', fontSize: 12.5 }}>{error}</div>
      )}

      <div className="field">
        <label>Email</label>
        <input className="input" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="field">
        <label>Password</label>
        <input className="input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary btn-block" disabled={submitting} onClick={handleSubmit}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </button>
      <p style={{ fontSize: 12, opacity: 0.6, margin: '4px 0 0' }}>
        New customer?{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/account/sign-up');
          }}
        >
          Create an account
        </a>
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
        <span style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '.06em' }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
      </div>
      <button className="btn btn-secondary btn-block" onClick={enterDemo}>
        View Demo →
      </button>
      <p style={{ fontSize: 11, opacity: 0.55, margin: '2px 0 0' }}>See the portal with sample data — no account needed.</p>
    </div>
  );
}
