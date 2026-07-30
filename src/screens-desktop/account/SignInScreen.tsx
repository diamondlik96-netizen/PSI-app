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
    <section style={{ maxWidth: 400, margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
      <h2>Sign in</h2>
      <p style={{ opacity: 0.75 }}>Access your project history, quotes, and service schedule.</p>

      {error && <div style={{ background: 'var(--color-accent)', color: '#fff', padding: '10px 12px', fontSize: 13, marginBottom: 'var(--space-3)' }}>{error}</div>}

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
      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 'var(--space-3)' }}>
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

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 'var(--space-4) 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
        <span style={{ fontSize: 11, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '.06em' }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
      </div>
      <button className="btn btn-secondary btn-block" onClick={enterDemo}>
        View Demo →
      </button>
      <p style={{ fontSize: 11, opacity: 0.55, marginTop: 4 }}>See the portal with sample data — no account needed.</p>
    </section>
  );
}
