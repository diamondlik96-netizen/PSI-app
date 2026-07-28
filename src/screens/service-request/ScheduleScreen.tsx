import { useMemo } from 'react';
import { SERVICE_TYPES, SLOT_POOL, useAppState } from '../../state/AppStateContext';
import { Chip } from '../../components/ui/Chip';

const YEAR = 2026;
const MONTH = 7; // August (0-indexed)
const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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

  const cells = useMemo(() => {
    const firstDow = new Date(YEAR, MONTH, 1).getDay();
    const list: Array<{ isBlank: true } | { isBlank: false; day: number; disabled: boolean }> = [];
    for (let i = 0; i < firstDow; i++) list.push({ isBlank: true });
    for (let d = 1; d <= 31; d++) {
      list.push({ isBlank: false, day: d, disabled: daySlotCount(d) === 0 });
    }
    return list;
  }, []);

  const availableSlots = scheduleForm.selectedDay ? SLOT_POOL.slice(0, daySlotCount(scheduleForm.selectedDay)) : [];

  if (scheduleForm.confirmed) {
    return (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h4 style={{ margin: 0 }}>Schedule Service</h4>
        <div className="card elev-sm" style={{ alignItems: 'center', textAlign: 'center', padding: '28px 16px' }}>
          <div className="tag tag-accent" style={{ marginBottom: 8 }}>Appointment requested</div>
          <h5>You're on the calendar.</h5>
          <p style={{ fontSize: 13, opacity: 0.75 }}>
            {scheduleForm.serviceType} on August {scheduleForm.selectedDay}, 2026 at {scheduleForm.selectedSlot}. We'll confirm by phone or email.
          </p>
          <button className="btn btn-secondary" onClick={() => dispatch({ type: 'resetScheduleForm' })}>
            Schedule another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h4 style={{ margin: 0 }}>Schedule Service</h4>
      <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>August 2026 — pick an available day.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
        {WEEKDAY_LABELS.map((wd, i) => (
          <div key={i} style={{ fontSize: 9, textAlign: 'center', opacity: 0.55, textTransform: 'uppercase' }}>
            {wd}
          </div>
        ))}
        {cells.map((cell, i) =>
          cell.isBlank ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              className="m-daybtn"
              disabled={cell.disabled}
              onClick={() => dispatch({ type: 'setScheduleForm', patch: { selectedDay: cell.day, selectedSlot: null } })}
              style={
                scheduleForm.selectedDay === cell.day
                  ? { background: 'var(--color-accent)', color: '#fff', borderColor: 'var(--color-accent)' }
                  : undefined
              }
            >
              {cell.day}
            </button>
          ),
        )}
      </div>

      {scheduleForm.selectedDay && (
        <div>
          <div style={{ fontSize: 11, opacity: 0.55, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Times — August {scheduleForm.selectedDay}
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {availableSlots.map((slot) => (
              <button
                key={slot}
                className="m-slot"
                data-active={scheduleForm.selectedSlot === slot}
                onClick={() => dispatch({ type: 'setScheduleForm', patch: { selectedSlot: slot } })}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {scheduleForm.selectedSlot && (
        <>
          <div className="field">
            <label>Service type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SERVICE_TYPES.map((opt) => (
                <Chip key={opt} active={scheduleForm.serviceType === opt} onClick={() => dispatch({ type: 'setScheduleForm', patch: { serviceType: opt } })}>
                  {opt}
                </Chip>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Facility / location</label>
            <input
              className="input"
              value={scheduleForm.location}
              onChange={(e) => dispatch({ type: 'setScheduleForm', patch: { location: e.target.value } })}
            />
          </div>
          <div className="field">
            <label>Notes for the technician</label>
            <textarea
              className="input"
              value={scheduleForm.notes}
              onChange={(e) => dispatch({ type: 'setScheduleForm', patch: { notes: e.target.value } })}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={() => dispatch({ type: 'confirmSchedule' })}>
            Confirm — Aug {scheduleForm.selectedDay}, {scheduleForm.selectedSlot}
          </button>
        </>
      )}
    </div>
  );
}
