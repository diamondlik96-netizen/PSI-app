import { useNavigate, useParams } from 'react-router-dom';
import { invoices } from '../../data/seed';
import { useAppState } from '../../state/AppStateContext';
import { Tag } from '../../components/ui/Tag';

export function InvoiceDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const invoice = invoices.find((i) => i.id === id);

  if (!invoice) {
    return (
      <section style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account')}>← Back to account</button>
        <p>Invoice not found.</p>
      </section>
    );
  }

  const paidNow = state.paidInvoices[invoice.id];
  const status = paidNow ? 'Paid' : invoice.status;
  const tagVariant = status === 'Paid' ? 'neutral' : 'accent';
  const paidNote = paidNow
    ? 'Paid just now · receipt emailed to your accounts contact.'
    : invoice.paidOn
      ? `Paid ${invoice.paidOn} via ${invoice.method}.`
      : '';

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <button className="btn btn-ghost" onClick={() => navigate('/account')}>← Back to account</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'var(--space-3)' }}>
        <div>
          <h2 style={{ margin: 0 }}>{invoice.amount}</h2>
          <div className="card-meta">{invoice.id} · {invoice.title} · ref {invoice.ref}</div>
          <div className="card-meta">Issued {invoice.date} · due {invoice.due}</div>
        </div>
        <Tag variant={tagVariant} style={{ fontSize: 13 }}>{status}</Tag>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #1a1a1a', marginTop: 'var(--space-4)' }}>
        {invoice.lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '11px 2px', borderBottom: '1px solid var(--color-divider)', fontSize: 13.5 }}>
            <span>{line.desc}</span><span style={{ fontWeight: 600, flex: 'none' }}>{line.amount}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '13px 2px', fontSize: 16, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
          <span>Total</span><span style={{ color: 'var(--color-accent)' }}>{invoice.amount}</span>
        </div>
      </div>

      {status !== 'Paid' && (
        <>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
            <button className="btn btn-primary" onClick={() => dispatch({ type: 'payInvoice', id: invoice.id })}>Pay {invoice.amount} now</button>
            <button className="btn btn-secondary" onClick={() => navigate('/account/messages')}>Question about this invoice</button>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 12, opacity: 0.55 }}>Secure payment via ACH or card. A receipt is emailed to your accounts contact.</p>
        </>
      )}
      {status === 'Paid' && (
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
          <Tag variant="accent">Paid</Tag>
          <div className="card-title">Payment received — thank you.</div>
          <p className="card-body">{paidNote}</p>
        </div>
      )}
    </section>
  );
}
