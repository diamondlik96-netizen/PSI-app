import { useEffect, useMemo, useState } from 'react';
import { SLOT_POOL, useAppState } from '../../state/AppStateContext';

const YEAR = 2026;
const MONTH = 7; // August (0-indexed)
const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SERVICE_TYPES = ['Repair / Adjustment', 'Preventive Maintenance', 'Inspection', 'Emergency'];

function daySlotCount(day: number): number {
  const dow = new Date(YEAR, MONTH, day).getDay();
  if (dow === 0 || dow === 6) return 0;
  if (day % 5 === 0) return 0;
  if (day % 4 === 0) return 1;
  return 3;
}

export function ScheduleScreen() {
  const { state, dispatch } = useAppState();
  const { scheduleForm } = state;
  const [step, setStep] = useState<'calendar' | 'details'>('calendar');

  // scheduleForm.serviceType is shared with the mobile screens, whose labels differ
  // ("Repair" vs "Repair / Adjustment", etc.) — normalize to a valid desktop label.
  useEffect(() => {
    if (!SERVICE_TYPES.includes(scheduleForm.serviceType)) {
      dispatch({ type: 'setScheduleForm', patch: { serviceType: SERVICE_TYPES[0] } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cells = useMemo(() => {
    const firstDow = new Date(YEAR, MONTH, 1).getDay();
    const list: Array<{ isBlank: true } | { isBlank: false; day: number; disabled: boolean; slotsLabel: string }> = [];
    for (let i = 0; i < firstDow; i++) list.push({ isBlank: true });
    for (let d = 1; d <= 31; d++) {
      const count = daySlotCount(d);
      const dow = new Date(YEAR, MONTH, d).getDay();
      const weekend = dow === 0 || dow === 6;
      list.push({ isBlank: false, day: d, disabled: count === 0, slotsLabel: weekend ? '' : count === 0 ? 'full' : `${count} open` });
    }
    return list;
  }, []);

  const availableSlots = scheduleForm.selectedDay ? SLOT_POOL.slice(0, daySlotCount(scheduleForm.selectedDay)) : [];

  if (scheduleForm.confirmed) {
    return (
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <h2>Schedule a Service Call</h2>
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
          <div className="tag tag-accent" style={{ marginBottom: 'var(--space-2)' }}>Appointment requested</div>
          <h3>You're on the calendar — pending confirmation.</h3>
          <p className="card-body">
            {scheduleForm.serviceType} on August {scheduleForm.selectedDay}, 2026 at {scheduleForm.selectedSlot}
            {scheduleForm.location ? ` — ${scheduleForm.location}` : ''}. We'll confirm by phone or email.
          </p>
          <button
            className="btn btn-secondary"
            style={{ marginTop: 'var(--space-3)' }}
            onClick={() => {
              dispatch({ type: 'resetScheduleForm' });
              setStep('calendar');
            }}
          >
            Schedule another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <h2>Schedule a Service Call</h2>

      {step === 'calendar' && (
        <>
          <p style={{ opacity: 0.75 }}>Pick an available day in August 2026.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, marginTop: 'var(--space-3)' }}>
            {WEEKDAY_LABELS.map((wd) => (
              <div key={wd} style={{ fontSize: 11, textAlign: 'center', opacity: 0.6, textTransform: 'uppercase' }}>{wd}</div>
            ))}
            {cells.map((cell, i) =>
              cell.isBlank ? (
                <div key={i} />
              ) : (
                <button
                  key={i}
                  className="cw-daybtn"
                  disabled={cell.disabled}
                  onClick={() => dispatch({ type: 'setScheduleForm', patch: { selectedDay: cell.day, selectedSlot: null } })}
                  style={scheduleForm.selectedDay === cell.day ? { background: 'var(--color-accent)', color: 'var(--color-bg)', borderColor: 'var(--color-accent)' } : undefined}
                >
                  <span>{cell.day}</span>
                  <span style={{ fontSize: 9, opacity: 0.7 }}>{cell.slotsLabel}</span>
                </button>
              ),
            )}
          </div>

          {scheduleForm.selectedDay && (
            <div style={{ marginTop: 'var(--space-4)' }}>
              <div className="card-meta" style={{ marginBottom: 'var(--space-2)' }}>Available times — August {scheduleForm.selectedDay}, 2026</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-2)' }}>
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    className="cw-slot"
                    style={scheduleForm.selectedSlot === slot ? { background: 'var(--color-accent)', color: 'var(--color-bg)', borderColor: 'var(--color-accent)' } : undefined}
                    onClick={() => dispatch({ type: 'setScheduleForm', patch: { selectedSlot: slot } })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {scheduleForm.selectedSlot && (
            <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={() => setStep('details')}>
              Continue with {scheduleForm.selectedSlot}
            </button>
          )}
        </>
      )}

      {step === 'details' && (
        <>
          <button className="btn btn-ghost" onClick={() => setStep('calendar')}>← Change date/time</button>
          <div className="card-meta" style={{ margin: 'var(--space-2) 0' }}>August {scheduleForm.selectedDay}, 2026 — {scheduleForm.selectedSlot}</div>
          <div className="field">
            <label>Service type</label>
            <div className="seg">
              {SERVICE_TYPES.map((opt) => (
                <label className="seg-opt" key={opt}>
                  <input
                    type="radio"
                    name="serviceType"
                    checked={scheduleForm.serviceType === opt}
                    onChange={() => dispatch({ type: 'setScheduleForm', patch: { serviceType: opt } })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="field"><label>Facility / location</label><input className="input" value={scheduleForm.location} onChange={(e) => dispatch({ type: 'setScheduleForm', patch: { location: e.target.value } })} /></div>
          <div className="field"><label>Notes for the technician</label><textarea className="input" value={scheduleForm.notes} onChange={(e) => dispatch({ type: 'setScheduleForm', patch: { notes: e.target.value } })} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <div className="field"><label>Name</label><input className="input" value={scheduleForm.name} onChange={(e) => dispatch({ type: 'setScheduleForm', patch: { name: e.target.value } })} /></div>
            <div className="field"><label>Phone</label><input className="input" value={scheduleForm.phone} onChange={(e) => dispatch({ type: 'setScheduleForm', patch: { phone: e.target.value } })} /></div>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => dispatch({ type: 'confirmSchedule' })}>Confirm appointment</button>
        </>
      )}
    </section>
  );
}
