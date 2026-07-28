import { useNavigate } from 'react-router-dom';
import { productTypes } from '../../data/seed';
import { useAppState } from '../../state/AppStateContext';
import { Chip } from '../../components/ui/Chip';

export function QuoteFlowScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const q = state.quoteForm;

  const photoLabel = q.photos ? `${q.photos} attached` : 'none yet';

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button className="btn btn-ghost" style={{ alignSelf: 'flex-start' }} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h4 style={{ margin: 0 }}>Request a Quote</h4>

      {q.submitted && (
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: '28px 16px' }}>
          <div className="tag tag-accent" style={{ marginBottom: 8 }}>Request received</div>
          <h5>Thanks — we're on it.</h5>
          <p style={{ fontSize: 13, opacity: 0.75 }}>A member of our team will follow up within one business day.</p>
          <button className="btn btn-secondary" onClick={() => dispatch({ type: 'resetQuoteForm' })}>
            Submit another
          </button>
        </div>
      )}

      {!q.submitted && !q.path && (
        <>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>Which best describes your situation?</p>
          <button className="card elev-sm" style={{ textAlign: 'left', cursor: 'pointer', gap: 4 }} onClick={() => dispatch({ type: 'setQuoteForm', patch: { path: 'unsure' } })}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 15 }}>Not sure what's needed</span>
            <span style={{ fontSize: 12, opacity: 0.7 }}>Describe the problem, send photos — we'll diagnose it.</span>
          </button>
          <button className="card elev-sm" style={{ textAlign: 'left', cursor: 'pointer', gap: 4 }} onClick={() => dispatch({ type: 'setQuoteForm', patch: { path: 'known' } })}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 15 }}>I know what I need</span>
            <span style={{ fontSize: 12, opacity: 0.7 }}>Product, dimensions, and location for a detailed quote.</span>
          </button>
        </>
      )}

      {!q.submitted && q.path === 'unsure' && (
        <>
          <div className="field">
            <label>What's going on?</label>
            <textarea
              className="input"
              placeholder="e.g. one partition panel is sticking"
              value={q.issueDescription}
              onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { issueDescription: e.target.value } })}
            />
          </div>
          <div className="field">
            <label>Photos (optional)</label>
            <div
              className="m-placeholder"
              style={{ height: 80, border: '1px dashed var(--color-divider)', cursor: 'pointer' }}
              onClick={() => dispatch({ type: 'setQuoteForm', patch: { photos: q.photos + 1 } })}
            >
              Tap to attach — {photoLabel}
            </div>
          </div>
          <div className="field">
            <label>Facility / location</label>
            <input className="input" value={q.location} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { location: e.target.value } })} />
          </div>
          <div className="field">
            <label>Phone</label>
            <input className="input" value={q.phone} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { phone: e.target.value } })} />
          </div>
          <button className="btn btn-primary btn-block" onClick={() => dispatch({ type: 'submitQuote' })}>
            Send request
          </button>
        </>
      )}

      {!q.submitted && q.path === 'known' && (
        <>
          <div className="field">
            <label>Product type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {productTypes.map((label) => (
                <Chip key={label} active={q.productType === label} onClick={() => dispatch({ type: 'setQuoteForm', patch: { productType: label } })}>
                  {label}
                </Chip>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Approximate dimensions / quantity</label>
            <input
              className="input"
              placeholder="e.g. 40ft run, 14ft high"
              value={q.dimensions}
              onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { dimensions: e.target.value } })}
            />
          </div>
          <div className="field">
            <label>Photos (optional)</label>
            <div
              className="m-placeholder"
              style={{ height: 80, border: '1px dashed var(--color-divider)', cursor: 'pointer' }}
              onClick={() => dispatch({ type: 'setQuoteForm', patch: { photos: q.photos + 1 } })}
            >
              Tap to attach — {photoLabel}
            </div>
          </div>
          <div className="field">
            <label>Facility / location</label>
            <input className="input" value={q.location} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { location: e.target.value } })} />
          </div>
          <div className="field">
            <label>Phone</label>
            <input className="input" value={q.phone} onChange={(e) => dispatch({ type: 'setQuoteForm', patch: { phone: e.target.value } })} />
          </div>
          <button className="btn btn-primary btn-block" disabled={!q.productType} onClick={() => dispatch({ type: 'submitQuote' })}>
            Send request
          </button>
        </>
      )}
    </div>
  );
}
