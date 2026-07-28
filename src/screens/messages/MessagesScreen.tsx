import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';

export function MessagesScreen() {
  const navigate = useNavigate();
  const { state } = useAppState();

  return (
    <div style={{ padding: '16px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account')}>←</button>
        <h4 style={{ margin: 0 }}>Messages</h4>
      </div>
      {state.threads.map((th) => (
        <button key={th.id} className="m-row" onClick={() => navigate(`/account/messages/${th.id}`)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
            <strong style={{ fontSize: 13 }}>{th.withName}</strong>
            <span style={{ fontSize: 11, opacity: 0.5 }}>{th.date}</span>
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{th.subject}</div>
        </button>
      ))}
    </div>
  );
}
