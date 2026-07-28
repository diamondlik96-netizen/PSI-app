import { useLocation, useNavigate } from 'react-router-dom';

const TABS = [
  { key: 'home', label: 'Home', glyph: '⌂', path: '/' },
  { key: 'projects', label: 'Projects', glyph: '▦', path: '/projects' },
  { key: 'team', label: 'Team', glyph: '☺', path: '/team' },
  { key: 'service', label: 'Service', glyph: '☷', path: '/schedule' },
  { key: 'account', label: 'Account', glyph: '◉', path: '/account' },
] as const;

function activeTabFor(pathname: string): string | null {
  if (pathname === '/' || pathname.startsWith('/services/')) return 'home';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/team')) return 'team';
  if (pathname.startsWith('/schedule')) return 'service';
  if (pathname.startsWith('/account')) return 'account';
  return null;
}

export function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const active = activeTabFor(location.pathname);

  return (
    <div
      style={{
        display: 'flex',
        borderTop: '2px solid var(--color-divider)',
        background: 'var(--color-bg)',
        flex: 'none',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)',
      }}
    >
      {TABS.map((tab) => (
        <button key={tab.key} className="m-tab" data-active={active === tab.key} onClick={() => navigate(tab.path)}>
          <span style={{ fontSize: 17, lineHeight: 1 }}>{tab.glyph}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
