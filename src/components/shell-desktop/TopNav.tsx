import { useNavigate, useLocation } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { psiLogoUrl, siteLinks } from '../../data/siteLinks';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'portfolio', label: 'Portfolio', path: '/projects' },
  { key: 'team', label: 'Team', path: '/team' },
  { key: 'quote', label: 'Get a Quote', path: '/quote' },
  { key: 'schedule', label: 'Schedule Service', path: '/schedule' },
  { key: 'messages', label: 'Messages', path: '/account/messages' },
  { key: 'account', label: 'Account', path: '/account' },
] as const;

function activeNavFor(pathname: string): string {
  if (pathname === '/' || pathname.startsWith('/services/')) return 'home';
  if (pathname.startsWith('/projects')) return 'portfolio';
  if (pathname.startsWith('/team')) return 'team';
  if (pathname.startsWith('/quote')) return 'quote';
  if (pathname.startsWith('/schedule')) return 'schedule';
  if (pathname.startsWith('/account/messages')) return 'messages';
  if (pathname.startsWith('/account')) return 'account';
  return '';
}

export function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAppState();
  const active = activeNavFor(location.pathname);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 20 }}>
      {/* utility strip — links back to the main psicrew.com site */}
      <div style={{ background: '#1a1a1a', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', padding: '6px var(--space-4)' }}>
        {siteLinks.map((link) => (
          <a key={link.label} href={link.href} style={{ color: 'rgba(255,255,255,.65)', fontSize: 11.5, textDecoration: 'none' }}>
            {link.label}
          </a>
        ))}
      </div>

      <nav
        style={{
          background: 'var(--color-header-bg)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          padding: '0 var(--space-4)',
          minHeight: 56,
        }}
      >
        <div style={{ background: '#fff', padding: '6px 14px', margin: '8px 0', cursor: 'pointer', flex: 'none' }} onClick={() => navigate('/')}>
          <img src={psiLogoUrl} alt="PSI — Precision Service & Installation" style={{ height: 34, width: 'auto', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', overflowX: 'auto', flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                className="cw-nav-link"
                style={{
                  color: '#fff',
                  opacity: isActive ? 1 : 0.82,
                  fontWeight: isActive ? 700 : 400,
                  borderBottom: `2px solid ${isActive ? 'var(--color-accent)' : 'transparent'}`,
                }}
                onClick={() => navigate(item.path)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div style={{ flex: 'none' }}>
          {state.isLoggedIn ? (
            <button className="btn btn-primary" onClick={() => navigate('/account')}>
              My Account
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate('/account')}>
              Sign In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
