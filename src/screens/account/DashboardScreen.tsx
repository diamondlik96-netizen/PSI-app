import { useNavigate } from 'react-router-dom';
import { equipment, history, invoices } from '../../data/seed';
import { unreadThreadCount, useAppState } from '../../state/AppStateContext';
import { useAuth } from '../../state/AuthContext';
import { RedBarHeading } from '../../components/ui/RedBarHeading';
import { Tag, TagLink } from '../../components/ui/Tag';
import { PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';

const TRACK_ETA = '8:05 AM';

export function DashboardScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const { isDemoMode, profile, signOut, exitDemo } = useAuth();
  const unreadCount = unreadThreadCount(state.threads);

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

  const review = state.review;
  const referral = state.referral;

  const title = isDemoMode ? 'Vinoy Resort' : profile?.companyName || profile?.fullName || 'there';
  const subtitle = isDemoMode ? 'St. Petersburg, FL — Facilities Office' : profile?.companyName ? profile?.fullName : profile?.email;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* dashboard header: black band */}
      <div style={{ background: '#0d0c0c', color: '#fff', padding: '20px 16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent-400)' }}>Client Dashboard</span>
              {isDemoMode && <Tag variant="accent">Demo mode</Tag>}
            </div>
            <h4 style={{ margin: '4px 0 2px', color: '#fff' }}>Good afternoon, {title}</h4>
            {subtitle && <p style={{ margin: 0, fontSize: 12, opacity: 0.6 }}>{subtitle}</p>}
          </div>
          <button
            className="btn btn-ghost"
            style={{ fontSize: 12, color: '#fff', flex: 'none' }}
            onClick={() => (isDemoMode ? exitDemo() : signOut())}
          >
            {isDemoMode ? 'Exit demo' : 'Log out'}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isDemoMode ? '1fr 1fr 1fr' : '1fr 1fr', gap: 8, marginTop: 14 }}>
          <button
            style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', padding: '10px 6px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
            onClick={() => navigate('/schedule')}
          >
            <span style={{ fontSize: 15 }}>☷</span>Schedule
          </button>
          <button
            style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', padding: '10px 6px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
            onClick={() => navigate('/quote')}
          >
            <span style={{ fontSize: 15 }}>✎</span>Quote
          </button>
          {isDemoMode && (
            <button
              style={{ background: 'var(--color-accent)', border: '1px solid var(--color-accent)', color: '#fff', padding: '10px 6px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', position: 'relative' }}
              onClick={() => navigate('/account/messages')}
            >
              <span style={{ fontSize: 15 }}>✉</span>Messages {unreadCount ? `(${unreadCount} unread)` : ''}
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {!isDemoMode && (
          <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: '24px 16px', gap: 6 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14 }}>You're all set — nothing here yet</div>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>Once you request a quote or schedule service, it'll show up here.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <button className="btn btn-primary" style={{ fontSize: 12, padding: '7px 12px' }} onClick={() => navigate('/quote')}>
                Request a Quote
              </button>
              <button className="btn btn-secondary" style={{ fontSize: 12, padding: '7px 12px' }} onClick={() => navigate('/schedule')}>
                Schedule Service
              </button>
            </div>
          </div>
        )}

        {isDemoMode && (
          <>
            {/* upcoming appointments */}
            <div>
              <RedBarHeading>Upcoming appointments</RedBarHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  style={{ display: 'flex', flexDirection: 'column', gap: 6, background: '#0d0c0c', color: '#fff', border: 'none', padding: 14, cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}
                  onClick={() => navigate('/account/tracking')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="m-pulse-dot" style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--color-accent)', flex: 'none' }} />
                    <span style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent-400)' }}>Happening now</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14 }}>Dan Hart is en route — ETA {TRACK_ETA}</div>
                  <div style={{ fontSize: 11.5, opacity: 0.65 }}>Partition track alignment · Grand Ballroom · Track live →</div>
                </button>
                {state.appointments.map((appt) => (
                  <div key={appt.id} className="card elev-sm" style={{ gap: 5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Tag variant="accent">{appt.type}</Tag>
                      <Tag variant="neutral">{appt.status}</Tag>
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13 }}>{appt.product}</div>
                    <div style={{ fontSize: 11, opacity: 0.55 }}>{appt.location} · {appt.date} · {appt.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* open quotes */}
            <div>
              <RedBarHeading>Open quote requests</RedBarHeading>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {openQuotesList.map((oq) => (
                  <button
                    key={oq.id}
                    style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '11px 2px', border: 'none', borderBottom: '1px solid var(--color-divider)', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left', width: '100%' }}
                    onClick={() => navigate(`/account/quotes/${oq.id}`)}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12.5 }}>{oq.title}</div>
                      <div style={{ opacity: 0.55, fontSize: 11 }}>{oq.id} · submitted {oq.submitted}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 'none' }}>
                      <Tag variant={oq.tagVariant}>{oq.status}</Tag>
                      <span style={{ color: 'var(--color-accent)' }}>›</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* equipment on file */}
            <div>
              <RedBarHeading>Your equipment</RedBarHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {equipmentList.map((eq) => (
                  <div key={eq.id} className="card elev-sm" style={{ gap: 5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                      <Tag variant="neutral">{eq.type}</Tag>
                      <Tag variant={eq.statusVariant}>{eq.status}</Tag>
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13 }}>{eq.name}</div>
                    <div style={{ fontSize: 11, opacity: 0.55 }}>{eq.panels} · last serviced {eq.lastService}</div>
                    <div style={{ fontSize: 11, color: eq.dueColor }}>Next service: {eq.due}</div>
                    {eq.needsService && (
                      <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 4, fontSize: 12, padding: '7px 12px' }} onClick={() => navigate('/schedule')}>
                        Schedule now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* history */}
            <div>
              <RedBarHeading>Service history</RedBarHeading>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {history.map((row) => (
                  <div key={row.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '10px 0', borderBottom: '1px solid var(--color-divider)', fontSize: 12.5 }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{row.description}</div>
                      <div style={{ opacity: 0.55, fontSize: 11 }}>{row.date} · {row.location}</div>
                    </div>
                    <Tag variant="neutral" style={{ alignSelf: 'center', flex: 'none' }}>{row.status}</Tag>
                  </div>
                ))}
              </div>
            </div>

            {/* invoices & payments */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <RedBarHeading style={{ marginBottom: 0 }}>Invoices &amp; payments</RedBarHeading>
                {hasBalanceDue && <Tag variant="accent">{balanceDueLabel}</Tag>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {invoiceList.map((inv) => (
                  <button
                    key={inv.id}
                    style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '11px 2px', border: 'none', borderBottom: '1px solid var(--color-divider)', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left', width: '100%' }}
                    onClick={() => navigate(`/account/invoices/${inv.id}`)}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12.5 }}>{inv.title}</div>
                      <div style={{ opacity: 0.55, fontSize: 11 }}>{inv.id} · {inv.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 'none' }}>
                      <span style={{ fontWeight: 600, fontSize: 12.5 }}>{inv.amount}</span>
                      <Tag variant={inv.tagVariant}>{inv.status}</Tag>
                      <span style={{ color: 'var(--color-accent)' }}>›</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* review request */}
            <div>
              <RedBarHeading>How did we do?</RedBarHeading>
              <div className="card elev-sm" style={{ gap: 8 }}>
                {!review.rating && !review.done && (
                  <>
                    <div style={{ fontSize: 12.5, opacity: 0.75 }}>
                      Rate your recent service: <strong>Annual partition track lubrication &amp; seal check</strong> — Jun 2, Dan Hart
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 26, padding: 2, color: n <= review.rating ? 'var(--color-accent)' : 'var(--color-neutral-300)' }}
                          aria-label={`${n} star${n > 1 ? 's' : ''}`}
                          onClick={() => dispatch({ type: 'setReviewRating', rating: n })}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {review.rating >= 4 && !review.done && (
                  <>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13.5 }}>Thank you! Mind sharing that publicly?</div>
                    <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>Reviews from facility pros like you are how other facilities find us.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button className="btn btn-primary" style={{ justifyContent: 'flex-start' }} onClick={() => dispatch({ type: 'submitReviewPublic' })}>
                        Leave a Google review →
                      </button>
                      <button className="btn btn-ghost" style={{ alignSelf: 'flex-start' }} onClick={() => dispatch({ type: 'skipReviewPublic' })}>
                        Maybe later
                      </button>
                    </div>
                  </>
                )}
                {review.rating > 0 && review.rating < 4 && !review.done && (
                  <>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13.5 }}>We want to make this right.</div>
                    <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
                      Tell us what happened — this goes straight to Dana and our service leadership, not to a public site.
                    </p>
                    <textarea
                      className="input"
                      placeholder="What could we have done better?"
                      value={review.comment}
                      onChange={(e) => dispatch({ type: 'setReviewComment', comment: e.target.value })}
                    />
                    <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => dispatch({ type: 'submitReviewFeedback' })}>
                      Send to our team
                    </button>
                  </>
                )}
                {review.done && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag variant="accent">{review.done === 'feedback' ? 'Received' : 'Thank you'}</Tag>
                    <span style={{ fontSize: 12.5, opacity: 0.75 }}>
                      {review.done === 'public'
                        ? 'Opening Google reviews — we appreciate you spreading the word.'
                        : review.done === 'feedback'
                          ? 'Our service leadership will follow up within one business day.'
                          : 'Thanks for the rating!'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* referral */}
        <div style={{ background: '#0d0c0c', color: '#fff', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent-400)' }}>Referral program</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 15 }}>Know a facility that needs PSI?</div>
          {!referral.sent && (
            <>
              <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
                Refer a facility manager and we'll credit your next preventive-maintenance visit when their first project completes.
              </p>
              <div className="field" style={{ margin: 0 }}>
                <label style={{ color: '#fff' }}>Facility / contact name</label>
                <input className="input" value={referral.name} onChange={(e) => dispatch({ type: 'setReferral', patch: { name: e.target.value } })} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label style={{ color: '#fff' }}>Their email or phone</label>
                <input className="input" value={referral.contact} onChange={(e) => dispatch({ type: 'setReferral', patch: { contact: e.target.value } })} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button className="btn btn-primary" onClick={() => dispatch({ type: 'submitReferral' })}>
                  Send referral
                </button>
                <button className="btn" style={{ border: '1px solid rgba(255,255,255,.4)', color: '#fff' }} onClick={() => dispatch({ type: 'shareReferralLink' })}>
                  {referral.linkCopied ? 'Link copied ✓' : 'Copy referral link'}
                </button>
              </div>
            </>
          )}
          {referral.sent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag variant="accent">Sent</Tag>
              <span style={{ fontSize: 12.5, opacity: 0.8 }}>Thanks — Brian will reach out to {referral.name} and keep you posted on your credit.</span>
            </div>
          )}
        </div>

        {/* account manager */}
        <div className="card elev-sm" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <PlaceholderPhoto label="PHOTO" height={44} circle fontSize={7} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>Your account manager</div>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>Brian Hartman</div>
            <div style={{ fontSize: 11, opacity: 0.55 }}>National Sales Manager</div>
          </div>
          <TagLink href="tel:8003301200">Call</TagLink>
        </div>
      </div>
    </div>
  );
}
