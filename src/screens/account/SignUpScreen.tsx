import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

export function SignUpScreen() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSubmit = async () => {
    if (!fullName.trim() || !companyName.trim() || !email.trim() || !password) {
      setError('Please fill in every field.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError(null);
    setSubmitting(true);
    const result = await signUp({ fullName: fullName.trim(), companyName: companyName.trim(), email: email.trim(), password });
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.needsEmailConfirmation) {
      setConfirmationSent(true);
    } else {
      navigate('/account');
    }
  };

  if (confirmationSent) {
    return (
      <div style={{ padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: '28px 16px' }}>
          <div className="tag tag-accent" style={{ marginBottom: 8 }}>Almost there</div>
          <h5>Check your email to confirm your account.</h5>
          <p style={{ fontSize: 13, opacity: 0.75 }}>We sent a confirmation link to {email}. Click it, then come back and sign in.</p>
          <button className="btn btn-secondary" onClick={() => navigate('/account')}>
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h4 style={{ margin: 0 }}>Create Your Account</h4>
      <p style={{ margin: 0, fontSize: 13, opacity: 0.65 }}>Set up access to your service history, appointments, and messages with our team.</p>

      {error && (
        <div style={{ background: 'var(--color-accent)', color: '#fff', padding: '10px 12px', fontSize: 12.5 }}>{error}</div>
      )}

      <div className="field">
        <label>Name</label>
        <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div className="field">
        <label>Work email</label>
        <input className="input" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="field">
        <label>Company or facility name</label>
        <input className="input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </div>
      <div className="field">
        <label>Password</label>
        <input className="input" type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary btn-block" disabled={submitting} onClick={handleSubmit}>
        {submitting ? 'Creating account…' : 'Create account'}
      </button>
      <p style={{ fontSize: 12, opacity: 0.6, margin: '4px 0 0' }}>
        Already have an account?{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/account');
          }}
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
