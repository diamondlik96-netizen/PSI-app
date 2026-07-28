import { useAppState } from '../../state/AppStateContext';
import { SignInScreen } from './SignInScreen';
import { DashboardScreen } from './DashboardScreen';

export function AccountScreen() {
  const { state } = useAppState();
  return state.isLoggedIn ? <DashboardScreen /> : <SignInScreen />;
}
