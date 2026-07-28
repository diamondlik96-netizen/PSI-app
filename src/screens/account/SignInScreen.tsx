import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';

export function SignInScreen() {
  const navigate = useNavigate();
  const { dispatch } = useAppState();

  return (
    <div style={{ padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h4 style={{ margin: 0 }}>Customer Sign In</h4>
      <p style={{ margin: 0, fontSize: 13, opacity: 0.65 }}>Access your service history, appointments, and messages with our team.</p>
      <div className="field">
        <label>Email</label>
        <input className="input" placeholder="you@company.com" />
      </div>
      <div className="field">
        <label>Password</label>
        <input className="input" type="password" placeholder="••••••••" />
      </div>
      <button className="btn btn-primary btn-block" onClick={() => dispatch({ type: 'logIn' })}>
        Sign in
      </button>
      <p style={{ fontSize: 12, opacity: 0.6, margin: '4px 0 0' }}>
        New customer? No account needed —{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/quote');
          }}
        >
          request a quote
        </a>{' '}
        or call (800) 330-1200 and we'll set you up.
      </p>
    </div>
  );
}
