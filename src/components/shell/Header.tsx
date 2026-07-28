import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';

export function Header() {
  const navigate = useNavigate();
  const { state } = useAppState();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderBottom: '2px solid var(--color-divider)',
        background: 'var(--color-bg)',
      }}
    >
      <img
        src="/assets/psi-logo.png"
        alt="PSI"
        style={{ height: 30, width: 'auto', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />
      {!state.isLoggedIn && (
        <button className="btn btn-primary" style={{ fontSize: 12, padding: '6px 14px' }} onClick={() => navigate('/account')}>
          Log In
        </button>
      )}
      {state.isLoggedIn && (
        <a href="tel:8003301200" className="tag tag-accent" style={{ textDecoration: 'none' }}>
          24/7 · (800) 330-1200
        </a>
      )}
    </div>
  );
}
