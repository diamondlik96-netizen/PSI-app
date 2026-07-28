import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';

export function MessagesScreen() {
  const { threadId } = useParams();
  const { state, dispatch } = useAppState();
  const [activeThreadId, setActiveThreadId] = useState(threadId ?? state.threads[0]?.id ?? null);
  const [replyText, setReplyText] = useState('');

  const activeThread = state.threads.find((t) => t.id === activeThreadId) ?? state.threads[0];

  const send = () => {
    if (!activeThread || !replyText.trim()) return;
    dispatch({ type: 'sendMessage', threadId: activeThread.id, text: replyText });
    setReplyText('');
  };

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <h2>Messages</h2>
      <div className="card elev-sm" style={{ padding: 0, display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: 460, overflow: 'hidden' }}>
        <div style={{ borderRight: '1px solid var(--color-divider)', overflowY: 'auto' }}>
          {state.threads.map((th) => (
            <button key={th.id} className="cw-thread" data-active={th.id === activeThread?.id} onClick={() => setActiveThreadId(th.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                <strong style={{ fontSize: 13 }}>{th.withName}</strong>
                <span style={{ fontSize: 11, opacity: 0.55 }}>{th.date}</span>
              </div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{th.subject}</div>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activeThread ? (
            <>
              <div style={{ padding: 'var(--space-3)', borderBottom: '1px solid var(--color-divider)' }}>
                <strong>{activeThread.subject}</strong>
                <div className="card-meta">with {activeThread.withName}</div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {activeThread.messages.map((msg, i) => {
                  const mine = msg.from === 'me';
                  return (
                    <div key={i} style={{ maxWidth: '70%', alignSelf: mine ? 'flex-end' : 'flex-start' }}>
                      <div style={{ background: mine ? 'var(--color-accent)' : 'var(--color-surface)', color: mine ? 'var(--color-bg)' : 'var(--color-text)', padding: '10px 12px', fontSize: 14 }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: 10, opacity: 0.5, marginTop: 3, textAlign: mine ? 'right' : 'left' }}>{msg.time}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ padding: 'var(--space-3)', borderTop: '1px solid var(--color-divider)', display: 'flex', gap: 'var(--space-2)' }}>
                <input className="input" placeholder="Write a reply…" value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
                <button className="btn btn-primary" onClick={send}>Send</button>
              </div>
            </>
          ) : (
            <div style={{ padding: 'var(--space-4)', opacity: 0.6 }}>No conversations yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
