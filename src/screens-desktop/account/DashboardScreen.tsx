import { useNavigate } from 'react-router-dom';
import { equipment, history, invoices } from '../../data/seed';
import { useAppState } from '../../state/AppStateContext';
import { Tag } from '../../components/ui/Tag';

const TRACK_ETA = '8:05 AM';

export function DashboardScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();

  const openQuotesList = state.openQuotes.map((oq) => {
    const decision = state.quoteDecisions[oq.id];
    const status = decision === 'approved' ? 'Approved' : decision === 'declined' ? 'Declined' : oq.status;
    const tagVariant = decision === 'approved' ? 'accent' : decision ? 'neutral' : oq.statusKind === 'action' ? 'accent' : 'neutral';
    return { ...oq, status, tagVariant: tagVariant as 'accent' | 'neutral' };
  });

  const equipmentList = equipment.map((eq) => ({
    ...eq,
    needsService: eq.status !== 'Good',
    statusVariant: (eq.status === 'Good' ? 'neutral' : 'accent') as 'accent' | 'neutral',
    dueColor: eq.status === 'Good' ? 'color-mix(in srgb, var(--color-text) 55%, transparent)' : 'var(--color-accent)',
  }));

  const invoiceList = invoices.map((inv) => {
    const paidNow = state.paidInvoices[inv.id];
    const status = paidNow ? 'Paid' : inv.status;
    return { ...inv, status, tagVariant: (status === 'Paid' ? 'neutral' : 'accent') as 'accent' | 'neutral' };
  });
  const hasBalanceDue = invoiceList.some((i) => i.status !== 'Paid');
  const balanceDueLabel = hasBalanceDue ? `${invoiceList.find((i) => i.status !== 'Paid')!.amount} due` : '';

  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <h2>My Account</h2>
      <p style={{ opacity: 0.75 }}>Vinoy Resort, St. Petersburg — Facilities Office</p>

      <button
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: '#0d0c0c', color: '#fff', border: 'none', padding: 'var(--space-3) var(--space-4)', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left', width: '100%', marginTop: 'var(--space-4)' }}
        onClick={() => navigate('/account/tracking')}
      >
        <span className="m-pulse-dot" style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-accent)', flex: 'none' }} />
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent-400)' }}>Happening now</span>
          <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16 }}>Dan Hart is en route — ETA {TRACK_ETA}</span>
          <span style={{ display: 'block', fontSize: 12, opacity: 0.65 }}>Partition track alignment · Grand Ballroom</span>
        </span>
        <span style={{ color: 'var(--color-accent-400)', flex: 'none' }}>Track live →</span>
      </button>

      <h6 style={{ color: 'var(--color-accent)', marginTop: 'var(--space-6)' }}>Upcoming</h6>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
        {state.appointments.map((appt) => (
          <div key={appt.id} className="card elev-sm">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Tag variant="accent">{appt.type}</Tag>
              <Tag variant={appt.status === 'Confirmed' ? 'accent' : 'neutral'}>{appt.status}</Tag>
            </div>
            <div className="card-title" style={{ fontSize: 15 }}>{appt.product}</div>
            <div className="card-meta">{appt.location}</div>
            <div className="card-meta">{appt.date} · {appt.time}</div>
          </div>
        ))}
      </div>
      {state.appointments.length === 0 && <p style={{ opacity: 0.6 }}>Nothing scheduled right now.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
        <div>
          <h6 style={{ color: 'var(--color-accent)' }}>Open quote requests</h6>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'var(--space-2)' }}>
            {openQuotesList.map((oq) => (
              <button
                key={oq.id}
                style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '11px 2px', border: 'none', borderBottom: '1px solid var(--color-divider)', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left', width: '100%' }}
                onClick={() => navigate(`/account/quotes/${oq.id}`)}
              >
                <span>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: 13 }}>{oq.title}</span>
                  <span style={{ display: 'block', opacity: 0.55, fontSize: 11 }}>{oq.id} · submitted {oq.submitted}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 'none' }}>
                  <Tag variant={oq.tagVariant}>{oq.status}</Tag>
                  <span style={{ color: 'var(--color-accent)' }}>›</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h6 style={{ color: 'var(--color-accent)' }}>Invoices &amp; payments</h6>
            {hasBalanceDue && <Tag variant="accent">{balanceDueLabel}</Tag>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'var(--space-2)' }}>
            {invoiceList.map((inv) => (
              <button
                key={inv.id}
                style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '11px 2px', border: 'none', borderBottom: '1px solid var(--color-divider)', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left', width: '100%' }}
                onClick={() => navigate(`/account/invoices/${inv.id}`)}
              >
                <span>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: 13 }}>{inv.title}</span>
                  <span style={{ display: 'block', opacity: 0.55, fontSize: 11 }}>{inv.id} · {inv.date}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 'none' }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{inv.amount}</span>
                  <Tag variant={inv.tagVariant}>{inv.status}</Tag>
                  <span style={{ color: 'var(--color-accent)' }}>›</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <h6 style={{ color: 'var(--color-accent)', marginTop: 'var(--space-6)' }}>Your equipment</h6>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
        {equipmentList.map((eq) => (
          <div key={eq.id} className="card elev-sm" style={{ gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
              <Tag variant="neutral">{eq.type}</Tag>
              <Tag variant={eq.statusVariant}>{eq.status}</Tag>
            </div>
            <div className="card-title" style={{ fontSize: 14 }}>{eq.name}</div>
            <div className="card-meta">{eq.panels} · last serviced {eq.lastService}</div>
            <div style={{ fontSize: 12, color: eq.dueColor }}>Next service: {eq.due}</div>
            {eq.needsService && (
              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 4, fontSize: 12, padding: '7px 12px' }} onClick={() => navigate('/schedule')}>
                Schedule now
              </button>
            )}
          </div>
        ))}
      </div>

      <h6 style={{ color: 'var(--color-accent)', marginTop: 'var(--space-6)' }}>Project &amp; service history</h6>
      <table className="table" style={{ marginTop: 'var(--space-2)' }}>
        <thead>
          <tr><th>Date</th><th>Type</th><th>Description</th><th>Location</th><th>Status</th></tr>
        </thead>
        <tbody>
          {history.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.type}</td>
              <td>{row.description}</td>
              <td>{row.location}</td>
              <td><Tag variant="neutral">{row.status}</Tag></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
        <button className="btn btn-primary" onClick={() => navigate('/quote')}>Request a Quote</button>
        <button className="btn btn-secondary" onClick={() => navigate('/schedule')}>Schedule Service</button>
        <button className="btn btn-secondary" onClick={() => navigate('/account/messages')}>Messages</button>
        <button className="btn btn-ghost" style={{ marginLeft: 'auto' }} onClick={() => dispatch({ type: 'logOut' })}>Log out</button>
      </div>
    </section>
  );
}
