import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { InstallBanner } from '../ui/InstallBanner';

export function DesktopShell() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column' }}>
      <TopNav />
      <InstallBanner />
      <main style={{ flex: 1, width: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
}
