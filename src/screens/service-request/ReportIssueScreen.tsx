import { useNavigate } from 'react-router-dom';
import { ISSUE_EQUIPMENT_OPTIONS, ISSUE_SEVERITY_OPTIONS, useAppState } from '../../state/AppStateContext';
import { Chip } from '../../components/ui/Chip';

const PHOTO_SLOTS = ['Wide shot — whole wall / system', 'Close-up — the problem area', 'Track / hardware (if reachable)', 'Model / serial plate'];

export function ReportIssueScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const issue = state.issueForm;

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button className="btn btn-ghost" style={{ alignSelf: 'flex-start' }} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {issue.submitted && (
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: '28px 16px' }}>
          <div className="tag tag-accent" style={{ marginBottom: 8 }}>Report received — IR-1042</div>
          <h5>Our team is reviewing your photos.</h5>
          <p style={{ fontSize: 13, opacity: 0.75 }}>
            A technician will assess the issue and get back to you within one business day — sooner if it's urgent.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginTop: 8 }}>
            <button className="btn btn-primary btn-block" onClick={() => navigate('/schedule')}>
              Schedule service now
            </button>
            <button className="btn btn-secondary btn-block" onClick={() => dispatch({ type: 'resetIssueForm' })}>
              Report another issue
            </button>
          </div>
        </div>
      )}

      {!issue.submitted && (
        <>
          <div>
            <h4 style={{ margin: '0 0 4px' }}>Report an Issue</h4>
            <p style={{ margin: 0, fontSize: 13, opacity: 0.65 }}>
              Snap a few photos — our technicians can often diagnose the problem before we even roll a truck.
            </p>
          </div>

          <div className="field">
            <label>Photos of the problem</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {PHOTO_SLOTS.map((label) => (
                <div key={label} className="m-placeholder" style={{ height: 110, border: '1px dashed var(--color-divider)', cursor: 'pointer' }}>
                  {label}
                </div>
              ))}
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 11, opacity: 0.55 }}>Tap or drag photos into the frames. Blurry is fine — we've seen it all.</p>
          </div>

          <div className="field">
            <label>What's affected?</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ISSUE_EQUIPMENT_OPTIONS.map((opt) => (
                <Chip key={opt} active={issue.equipment === opt} onClick={() => dispatch({ type: 'setIssueForm', patch: { equipment: opt } })}>
                  {opt}
                </Chip>
              ))}
            </div>
          </div>

          <div className="field">
            <label>How urgent is it?</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ISSUE_SEVERITY_OPTIONS.map((opt) => (
                <Chip key={opt} active={issue.severity === opt} onClick={() => dispatch({ type: 'setIssueForm', patch: { severity: opt } })}>
                  {opt}
                </Chip>
              ))}
            </div>
            {issue.severity === 'Emergency' && (
              <div style={{ background: 'var(--color-accent)', color: '#fff', padding: '10px 12px', marginTop: 8, fontSize: 12.5 }}>
                For a wall down before an event, calling is fastest:{' '}
                <a href="tel:8003301200" style={{ color: '#fff', fontWeight: 600 }}>
                  (800) 330-1200
                </a>{' '}
                — 24/7, 365.
              </div>
            )}
          </div>

          <div className="field">
            <label>Describe what's happening</label>
            <textarea
              className="input"
              placeholder="e.g. panel 6 drags on the floor for the last 4 feet of travel"
              value={issue.description}
              onChange={(e) => dispatch({ type: 'setIssueForm', patch: { description: e.target.value } })}
            />
          </div>
          <div className="field">
            <label>Facility / location</label>
            <input
              className="input"
              placeholder="Building, room, wall"
              value={issue.location}
              onChange={(e) => dispatch({ type: 'setIssueForm', patch: { location: e.target.value } })}
            />
          </div>
          <div className="field">
            <label>Callback phone</label>
            <input className="input" value={issue.phone} onChange={(e) => dispatch({ type: 'setIssueForm', patch: { phone: e.target.value } })} />
          </div>
          <button className="btn btn-primary btn-block" onClick={() => dispatch({ type: 'submitIssue' })}>
            Send report
          </button>
        </>
      )}
    </div>
  );
}
