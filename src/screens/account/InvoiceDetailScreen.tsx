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
      <div style={{ padding: 16 }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account')}>←</button>
        <p>Invoice not found.</p>
      </div>
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 8, borderBottom: '1px solid var(--color-divider)' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/account')}>←</button>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13.5 }}>{invoice.id}</div>
          <div style={{ fontSize: 11, opacity: 0.55 }}>{invoice.title} · ref {invoice.ref}</div>
        </div>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 26 }}>{invoice.amount}</div>
            <div style={{ fontSize: 11.5, opacity: 0.6 }}>Issued {invoice.date} · due {invoice.due}</div>
          </div>
          <Tag variant={tagVariant} style={{ fontSize: 12 }}>{status}</Tag>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 26, height: 3, background: 'var(--color-accent)', flex: 'none' }} />
            <h6 style={{ margin: 0 }}>Line items</h6>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #1a1a1a' }}>
            {invoice.lines.map((line, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '10px 2px', borderBottom: '1px solid var(--color-divider)', fontSize: 12.5 }}>
                <span>{line.desc}</span>
                <span style={{ fontWeight: 600, flex: 'none' }}>{line.amount}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '12px 2px', fontSize: 14, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              <span>Total</span>
              <span style={{ color: 'var(--color-accent)' }}>{invoice.amount}</span>
            </div>
          </div>
        </div>

        {status !== 'Paid' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '13px 16px', fontSize: 15 }} onClick={() => dispatch({ type: 'payInvoice', id: invoice.id })}>
              Pay {invoice.amount} now
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '13px 16px' }} onClick={() => navigate('/account/messages/th1')}>
              Question about this invoice
            </button>
            <p style={{ margin: '2px 0 0', fontSize: 11, opacity: 0.55 }}>Secure payment via ACH or card. A receipt is emailed to your accounts contact.</p>
          </div>
        )}
        {status === 'Paid' && (
          <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: '22px 16px', gap: 6 }}>
            <Tag variant="accent">Paid</Tag>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14 }}>Payment received — thank you.</div>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>{paidNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
