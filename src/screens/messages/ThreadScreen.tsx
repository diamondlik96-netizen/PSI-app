import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';

export function ThreadScreen() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const [replyText, setReplyText] = useState('');
  const thread = state.threads.find((t) => t.id === threadId);

  if (!thread) {
    return (
      <div style={{ padding: 16 }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account/messages')}>←</button>
        <p>Conversation not found.</p>
      </div>
    );
  }

  const send = () => {
    if (!replyText.trim()) return;
    dispatch({ type: 'sendMessage', threadId: thread.id, text: replyText });
    setReplyText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 8, borderBottom: '1px solid var(--color-divider)' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account/messages')}>←</button>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13 }}>{thread.withName}</div>
          <div style={{ fontSize: 11, opacity: 0.55 }}>{thread.subject}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {thread.messages.map((msg, i) => {
          const mine = msg.from === 'me';
          return (
            <div key={i} style={{ maxWidth: '80%', alignSelf: mine ? 'flex-end' : 'flex-start' }}>
              <div style={{ background: mine ? 'var(--color-accent)' : 'var(--color-surface)', color: mine ? '#fff' : 'var(--color-text)', padding: '9px 12px', fontSize: 13 }}>
                {msg.text}
              </div>
              <div style={{ fontSize: 9, opacity: 0.5, marginTop: 2, textAlign: mine ? 'right' : 'left' }}>{msg.time}</div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: 10, borderTop: '1px solid var(--color-divider)', display: 'flex', gap: 8 }}>
        <input
          className="input"
          placeholder="Write a reply…"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="btn btn-primary" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
