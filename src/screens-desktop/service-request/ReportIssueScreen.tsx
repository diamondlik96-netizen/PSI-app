import { useNavigate } from 'react-router-dom';
import { ISSUE_EQUIPMENT_OPTIONS, ISSUE_SEVERITY_OPTIONS, useAppState } from '../../state/AppStateContext';

const PHOTO_SLOTS = ['Wide shot — whole wall / system', 'Close-up — the problem area', 'Track / hardware (if reachable)', 'Model / serial plate'];

export function ReportIssueScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const issue = state.issueForm;

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <h2>Report an Issue</h2>

      {issue.submitted && (
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
          <div className="tag tag-accent" style={{ marginBottom: 'var(--space-2)' }}>Report received — IR-1042</div>
          <h3>Our team is reviewing your photos.</h3>
          <p className="card-body">A technician will assess the issue and get back to you within one business day — sooner if it's urgent.</p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
            <button className="btn btn-primary" onClick={() => navigate('/schedule')}>Schedule service now</button>
            <button className="btn btn-secondary" onClick={() => dispatch({ type: 'resetIssueForm' })}>Report another issue</button>
          </div>
        </div>
      )}

      {!issue.submitted && (
        <>
          <p style={{ opacity: 0.75 }}>Snap a few photos — our technicians can often diagnose the problem before we even roll a truck.</p>
          <div className="field" style={{ marginTop: 'var(--space-3)' }}>
            <label>Photos of the problem</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
              {PHOTO_SLOTS.map((label) => (
                <div key={label} className="m-placeholder" style={{ height: 130, border: '1px dashed var(--color-divider)', cursor: 'pointer' }}>
                  {label}
                </div>
              ))}
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 12, opacity: 0.55 }}>Click or drag photos into the frames. Blurry is fine — we've seen it all.</p>
          </div>

          <div className="field">
            <label>What's affected?</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {ISSUE_EQUIPMENT_OPTIONS.map((opt) => (
                <button key={opt} className="cw-chip" data-active={issue.equipment === opt} onClick={() => dispatch({ type: 'setIssueForm', patch: { equipment: opt } })}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>How urgent is it?</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {ISSUE_SEVERITY_OPTIONS.map((opt) => (
                <button key={opt} className="cw-chip" data-active={issue.severity === opt} onClick={() => dispatch({ type: 'setIssueForm', patch: { severity: opt } })}>
                  {opt}
                </button>
              ))}
            </div>
            {issue.severity === 'Emergency' && (
              <div style={{ background: 'var(--color-accent)', color: '#fff', padding: '10px 12px', marginTop: 8, fontSize: 13 }}>
                For a wall down before an event, calling is fastest:{' '}
                <a href="tel:8003301200" style={{ color: '#fff', fontWeight: 600 }}>(800) 330-1200</a> — 24/7, 365.
              </div>
            )}
          </div>

          <div className="field"><label>Describe what's happening</label><textarea className="input" placeholder="e.g. panel 6 drags on the floor for the last 4 feet of travel" value={issue.description} onChange={(e) => dispatch({ type: 'setIssueForm', patch: { description: e.target.value } })} /></div>
          <div className="field"><label>Facility / location</label><input className="input" placeholder="Building, room, wall" value={issue.location} onChange={(e) => dispatch({ type: 'setIssueForm', patch: { location: e.target.value } })} /></div>
          <div className="field"><label>Callback phone</label><input className="input" value={issue.phone} onChange={(e) => dispatch({ type: 'setIssueForm', patch: { phone: e.target.value } })} /></div>
          <button className="btn btn-primary btn-block" onClick={() => dispatch({ type: 'submitIssue' })}>Send report</button>
        </>
      )}
    </section>
  );
}
