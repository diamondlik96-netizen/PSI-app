import { useNavigate, useParams } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { Tag } from '../../components/ui/Tag';

export function QuoteDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const quote = state.openQuotes.find((q) => q.id === id);

  if (!quote) {
    return (
      <div style={{ padding: 16 }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account')}>←</button>
        <p>Quote not found.</p>
      </div>
    );
  }

  const decision = state.quoteDecisions[quote.id];
  const status = decision === 'approved' ? 'Approved' : decision === 'declined' ? 'Declined' : quote.status;
  const tagVariant = decision === 'approved' ? 'accent' : decision ? 'neutral' : quote.statusKind === 'action' ? 'accent' : 'neutral';
  const showActions = quote.approvable && !decision;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 8, borderBottom: '1px solid var(--color-divider)' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account')}>←</button>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13.5 }}>{quote.title}</div>
          <div style={{ fontSize: 11, opacity: 0.55 }}>{quote.id} · submitted {quote.submitted}</div>
        </div>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <Tag variant={tagVariant}>{status}</Tag>
          {quote.approvable && <Tag variant="neutral">Valid through {quote.validThru}</Tag>}
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, opacity: 0.75 }}>{quote.note}</p>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 26, height: 3, background: 'var(--color-accent)', flex: 'none' }} />
            <h6 style={{ margin: 0 }}>Line items</h6>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #1a1a1a' }}>
            {quote.lines.map((line, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '10px 2px', borderBottom: '1px solid var(--color-divider)', fontSize: 12.5 }}>
                <span>{line.desc}</span>
                <span style={{ fontWeight: 600, flex: 'none' }}>{line.amount}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '12px 2px', fontSize: 14, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              <span>Total</span>
              <span style={{ color: 'var(--color-accent)' }}>{quote.total}</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11.5, opacity: 0.6 }}>Prepared by {quote.contact}</div>

        {showActions && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '13px 16px', fontSize: 15 }} onClick={() => dispatch({ type: 'approveQuote', id: quote.id })}>
              Approve quote — {quote.total}
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '13px 16px' }} onClick={() => dispatch({ type: 'declineQuote', id: quote.id })}>
              Decline
            </button>
            <button className="btn btn-ghost" style={{ alignSelf: 'flex-start' }} onClick={() => navigate('/account/messages/th2')}>
              Ask a question instead
            </button>
          </div>
        )}
        {decision === 'approved' && (
          <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: '22px 16px', gap: 6 }}>
            <Tag variant="accent">Approved</Tag>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14 }}>Thanks — we'll take it from here.</div>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>{quote.contact} will reach out within one business day to schedule the work.</p>
          </div>
        )}
        {decision === 'declined' && (
          <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: '22px 16px', gap: 6 }}>
            <Tag variant="neutral">Declined</Tag>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>No problem — this quote is closed. If anything changes, we're a message away.</p>
          </div>
        )}
      </div>
    </div>
  );
}
