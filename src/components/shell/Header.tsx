import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { psiLogoUrl, siteLinks } from '../../data/siteLinks';

export function Header() {
  const navigate = useNavigate();
  const { state } = useAppState();

  return (
    <div style={{ background: 'var(--color-header-bg)', paddingTop: 'env(safe-area-inset-top)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
        }}
      >
        <div style={{ background: '#fff', padding: '5px 10px', cursor: 'pointer', flex: 'none' }} onClick={() => navigate('/')}>
          <img src={psiLogoUrl} alt="PSI — Precision Service & Installation" style={{ height: 26, width: 'auto', display: 'block' }} />
        </div>
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
      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 16px 8px' }}>
        {siteLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{ color: 'rgba(255,255,255,.7)', fontSize: 11, textDecoration: 'none', whiteSpace: 'nowrap', flex: 'none' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
