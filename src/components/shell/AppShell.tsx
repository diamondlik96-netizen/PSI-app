import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomTabBar } from './BottomTabBar';
import { InstallBanner } from '../ui/InstallBanner';

export function AppShell() {
  return (
    <div className="app-frame">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '100dvh',
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        <Header />
        <InstallBanner />
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <Outlet />
        </div>
        <BottomTabBar />
      </div>
    </div>
  );
}
