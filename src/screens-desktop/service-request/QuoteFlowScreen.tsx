import { useEffect, useState } from 'react';
import { useAppState } from '../../state/AppStateContext';

const PRODUCT_TYPES = ['Operable Partitions', 'Bleachers', 'Basketball Systems', 'Volleyball Systems', 'Divider Curtains'];

type KnownStep = 'product' | 'details' | 'contact' | 'review';
const STEP_NUM: Record<KnownStep, number> = { product: 1, details: 2, contact: 3, review: 4 };
const PREV_STEP: Record<Exclude<KnownStep, 'product'>, KnownStep> = { details: 'product', contact: 'details', review: 'contact' };

export function QuoteFlowScreen() {
  const { state, dispatch } = useAppState();
  const q = state.quoteForm;
  const [knownStep, setKnownStep] = useState<KnownStep>('product');

  const photoLabel = q.photos ? `${q.photos} attached` : 'none yet';
  const followUpSuffix = q.location ? ` for ${q.location}` : '';

  // quoteForm.productType is shared with the mobile screens, which offer an extra
  // "Wall Padding" option not present here — normalize to a valid desktop label.
  useEffect(() => {
    if (q.path === 'known' && q.productType && !PRODUCT_TYPES.includes(q.productType)) {
      dispatch({ type: 'setQuoteForm', patch: { productType: '' } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.path]);

  const startOver = () => {
    dispatch({ type: 'setQuoteForm', patch: { path: null } });
    setKnownStep('product');
  };

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <h2>Request a Quote</h2>

      {q.submitted && (
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
          <div className="tag tag-accent" style={{ marginBottom: 'var(--space-2)' }}>Request received</div>
          <h3>Thanks — we're on it.</h3>
          <p className="card-body">A member of our team will follow up within one business day to confirm details{followUpSuffix}.</p>
          <button
            className="btn btn-secondary"
            style={{ marginTop: 'var(--space-3)' }}
            onClick={() => {
              dispatch({ type: 'resetQuoteForm' });
              setKnownStep('product');
            }}
          >
            Submit another request
          </button>
        </div>
      )}

      {!q.submitted && !q.path && (
        <>
          <p style={{ opacity: 0.75 }}>First, which best describes your situation?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
            <button className="card elev-sm" style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid transparent' }} onClick={() => dispatch({ type: 'setQuoteForm', patch: { path: 'unsure' } })}>
              <div className="card-title">Not sure what's needed</div>
              <p className="card-body">Describe the problem and send photos — we'll diagnose it and scope the work.</p>
            </button>
            <button className="card elev-sm" style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid transparent' }} onClick={() => dispatch({ type: 'setQuoteForm', patch: { path: 'known' } })}>
              <div className="card-title">I know what I need</div>
              <p className="card-body">Specify the product, dimensions, and location for a detailed quote.</p>
            </button>
          </div>
        </>
      )}

      {!q.submitted && q.path === 'unsure' && (
        <>
          <button className="btn btn-ghost" onClick={startOver}>← Start over</button>
          <div className="field" style={{ marginTop: 'var(--space-3)' }}>
            <label>What's going on?</label>
            <textarea
              className="input"
              placeholder="e.g. one partition panel is sticking and won't roll smoothly"
              value={q.issueDescription}
              onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { issueDescription: e.target.value } })}
            />
          </div>
          <div className="field">
            <label>Photos (optional)</label>
            <div className="m-placeholder" style={{ height: 100, border: '1px dashed var(--color-divider)', cursor: 'pointer' }} onClick={() => dispatch({ type: 'setQuoteForm', patch: { photos: q.photos + 1 } })}>
              Click to attach photos — {photoLabel}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <div className="field"><label>Name</label><input className="input" value={q.name} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { name: e.target.value } })} /></div>
            <div className="field"><label>Phone</label><input className="input" value={q.phone} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { phone: e.target.value } })} /></div>
          </div>
          <div className="field"><label>Email</label><input className="input" value={q.email} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { email: e.target.value } })} /></div>
          <div className="field"><label>Facility / location</label><input className="input" value={q.location} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { location: e.target.value } })} /></div>
          <button className="btn btn-primary btn-block" onClick={() => dispatch({ type: 'submitQuote' })}>Send request</button>
        </>
      )}

      {!q.submitted && q.path === 'known' && (
        <>
          <button className="btn btn-ghost" onClick={startOver}>← Start over</button>
          <div style={{ fontSize: 12, opacity: 0.6, margin: 'var(--space-2) 0' }}>Step {STEP_NUM[knownStep]} of 4</div>

          {knownStep === 'product' && (
            <>
              <div className="field">
                <label>Product type</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                  {PRODUCT_TYPES.map((label) => (
                    <button
                      key={label}
                      className="card"
                      style={{
                        cursor: 'pointer',
                        padding: 'var(--space-3)',
                        textAlign: 'left',
                        border: `1px solid ${q.productType === label ? 'var(--color-accent)' : 'var(--color-divider)'}`,
                        background: q.productType === label ? 'var(--color-accent-100)' : 'var(--color-surface)',
                      }}
                      onClick={() => dispatch({ type: 'setQuoteForm', patch: { productType: label } })}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary" disabled={!q.productType} onClick={() => setKnownStep('details')}>Continue</button>
            </>
          )}

          {knownStep === 'details' && (
            <>
              <div className="field"><label>Approximate dimensions / quantity</label><input className="input" placeholder="e.g. 40ft run, 14ft high" value={q.dimensions} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { dimensions: e.target.value } })} /></div>
              <div className="field"><label>Notes</label><textarea className="input" value={q.notes} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { notes: e.target.value } })} /></div>
              <div className="field">
                <label>Photos (optional)</label>
                <div className="m-placeholder" style={{ height: 100, border: '1px dashed var(--color-divider)', cursor: 'pointer' }} onClick={() => dispatch({ type: 'setQuoteForm', patch: { photos: q.photos + 1 } })}>
                  Click to attach photos — {photoLabel}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button className="btn btn-secondary" onClick={() => setKnownStep(PREV_STEP.details)}>Back</button>
                <button className="btn btn-primary" onClick={() => setKnownStep('contact')}>Continue</button>
              </div>
            </>
          )}

          {knownStep === 'contact' && (
            <>
              <div className="field"><label>Facility / location</label><input className="input" value={q.location} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { location: e.target.value } })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div className="field"><label>Name</label><input className="input" value={q.name} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { name: e.target.value } })} /></div>
                <div className="field"><label>Phone</label><input className="input" value={q.phone} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { phone: e.target.value } })} /></div>
              </div>
              <div className="field"><label>Email</label><input className="input" value={q.email} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { email: e.target.value } })} /></div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button className="btn btn-secondary" onClick={() => setKnownStep(PREV_STEP.contact)}>Back</button>
                <button className="btn btn-primary" onClick={() => setKnownStep('review')}>Continue</button>
              </div>
            </>
          )}

          {knownStep === 'review' && (
            <>
              <div className="card elev-sm" style={{ gap: 'var(--space-2)' }}>
                <div className="card-meta">Product</div><div>{q.productType}</div>
                <div className="card-meta">Dimensions / quantity</div><div>{q.dimensions || '—'}</div>
                <div className="card-meta">Location</div><div>{q.location}</div>
                <div className="card-meta">Contact</div><div>{q.name} — {q.email} — {q.phone}</div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                <button className="btn btn-secondary" onClick={() => setKnownStep(PREV_STEP.review)}>Back</button>
                <button className="btn btn-primary" onClick={() => dispatch({ type: 'submitQuote' })}>Submit request</button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
