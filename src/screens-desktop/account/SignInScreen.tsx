import { useAppState } from '../../state/AppStateContext';

export function SignInScreen() {
  const { dispatch } = useAppState();

  return (
    <section style={{ maxWidth: 400, margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
      <h2>Sign in</h2>
      <p style={{ opacity: 0.75 }}>Access your project history, quotes, and service schedule.</p>
      <div className="field"><label>Email</label><input className="input" placeholder="you@company.com" /></div>
      <div className="field"><label>Password</label><input className="input" type="password" placeholder="••••••••" /></div>
      <button className="btn btn-primary btn-block" onClick={() => dispatch({ type: 'logIn' })}>Sign in</button>
      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 'var(--space-3)' }}>New customer? Request a quote and we'll set up your account.</p>
    </section>
  );
}
