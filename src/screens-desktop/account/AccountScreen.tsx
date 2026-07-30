import { useAuth } from '../../state/AuthContext';
import { SignInScreen } from './SignInScreen';
import { DashboardScreen } from './DashboardScreen';

export function AccountScreen() {
  const { status } = useAuth();

  if (status === 'loading') {
    return <div style={{ padding: 48, textAlign: 'center', opacity: 0.6, fontSize: 13 }}>Loading…</div>;
  }
  return status === 'authenticated' || status === 'demo' ? <DashboardScreen /> : <SignInScreen />;
}
