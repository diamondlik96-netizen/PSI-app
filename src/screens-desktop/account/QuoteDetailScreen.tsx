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
      <section style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account')}>← Back to account</button>
        <p>Quote not found.</p>
      </section>
    );
  }

  const decision = state.quoteDecisions[quote.id];
  const status = decision === 'approved' ? 'Approved' : decision === 'declined' ? 'Declined' : quote.status;
  const tagVariant = decision === 'approved' ? 'accent' : decision ? 'neutral' : quote.statusKind === 'action' ? 'accent' : 'neutral';
  const showActions = quote.approvable && !decision;

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <button className="btn btn-ghost" onClick={() => navigate('/account')}>← Back to account</button>
      <h2 style={{ marginTop: 'var(--space-3)' }}>{quote.title}</h2>
      <div className="card-meta">{quote.id} · submitted {quote.submitted}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 'var(--space-3)' }}>
        <Tag variant={tagVariant}>{status}</Tag>
        {quote.approvable && <Tag variant="neutral">Valid through {quote.validThru}</Tag>}
      </div>
      <p style={{ fontSize: 14, opacity: 0.8, maxWidth: 560 }}>{quote.note}</p>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #1a1a1a', marginTop: 'var(--space-3)' }}>
        {quote.lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '11px 2px', borderBottom: '1px solid var(--color-divider)', fontSize: 13.5 }}>
            <span>{line.desc}</span><span style={{ fontWeight: 600, flex: 'none' }}>{line.amount}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '13px 2px', fontSize: 16, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
          <span>Total</span><span style={{ color: 'var(--color-accent)' }}>{quote.total}</span>
        </div>
      </div>
      <div style={{ fontSize: 12, opacity: 0.6, marginTop: 'var(--space-2)' }}>Prepared by {quote.contact}</div>

      {showActions && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'approveQuote', id: quote.id })}>Approve quote — {quote.total}</button>
          <button className="btn btn-secondary" onClick={() => dispatch({ type: 'declineQuote', id: quote.id })}>Decline</button>
          <button className="btn btn-ghost" onClick={() => navigate('/account/messages')}>Ask a question instead</button>
        </div>
      )}
      {decision === 'approved' && (
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
          <Tag variant="accent">Approved</Tag>
          <div className="card-title">Thanks — we'll take it from here.</div>
          <p className="card-body">{quote.contact} will reach out within one business day to schedule the work.</p>
        </div>
      )}
      {decision === 'declined' && (
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
          <Tag variant="neutral">Declined</Tag>
          <p className="card-body">No problem — this quote is closed. If anything changes, we're a message away.</p>
        </div>
      )}
    </section>
  );
}
