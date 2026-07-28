import { useNavigate } from 'react-router-dom';
import { PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';
import { TagLink, TagButton } from '../../components/ui/Tag';

const TRACK_STEPS = [
  { label: 'Appointment confirmed', time: 'Jul 24, 9:20 AM', state: 'done' as const },
  { label: 'Technician assigned — Dan Hart', time: 'Aug 3, 4:12 PM', state: 'done' as const },
  { label: 'En route', time: 'Today, 7:38 AM · 3.2 mi away', state: 'current' as const },
  { label: 'On site', time: '—', state: 'todo' as const },
  { label: 'Work complete', time: '—', state: 'todo' as const },
];

function stepStyle(state: 'done' | 'current' | 'todo') {
  return {
    dotBg: state === 'done' ? 'var(--color-accent)' : state === 'current' ? '#fff' : 'var(--color-neutral-300)',
    dotBorder: state === 'todo' ? 'var(--color-neutral-300)' : 'var(--color-accent)',
    lineBg: state === 'done' ? 'var(--color-accent)' : 'var(--color-neutral-300)',
    weight: state === 'current' ? 800 : 400,
    color: state === 'todo' ? 'color-mix(in srgb, var(--color-text) 45%, transparent)' : 'var(--color-text)',
  };
}

export function TechnicianTrackingScreen() {
  const navigate = useNavigate();

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <button className="btn btn-ghost" onClick={() => navigate('/account')}>← Back to account</button>
      <h2 style={{ marginTop: 'var(--space-3)' }}>Service call — today</h2>
      <div className="card-meta">Partition track alignment · Grand Ballroom · ref SC-4188</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
        <div>
          <div style={{ position: 'relative', height: 280, background: 'var(--color-neutral-200)', overflow: 'hidden' }}>
            <PlaceholderPhoto label={'MAP — live technician location\n(St. Petersburg, FL)'} height={280} style={{ position: 'absolute', inset: 0, width: '100%' }} />
            <div className="m-pulse-dot" style={{ position: 'absolute', left: '24%', top: '58%', width: 14, height: 14, borderRadius: '50%', background: 'var(--color-accent)', border: '2.5px solid #fff' }} />
            <div style={{ position: 'absolute', right: '18%', top: '26%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 12, height: 12, background: '#0d0c0c', border: '2.5px solid #fff' }} />
              <span style={{ fontSize: 10, background: '#0d0c0c', color: '#fff', padding: '2px 6px' }}>Vinoy Resort</span>
            </div>
          </div>
          <div style={{ background: 'var(--color-accent)', color: '#fff', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 17 }}>Arriving ~8:05 AM</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>Dan Hart · PSI Service Van #4 · 3.2 mi away</div>
            </div>
            <span className="m-pulse-dot" style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', flex: 'none' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <h6 style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>Status</h6>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TRACK_STEPS.map((step, i) => {
                const s = stepStyle(step.state);
                return (
                  <div key={i} style={{ display: 'flex', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 13, height: 13, borderRadius: '50%', flex: 'none', background: s.dotBg, border: `2px solid ${s.dotBorder}` }} />
                      {i < TRACK_STEPS.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 22, background: s.lineBg }} />}
                    </div>
                    <div style={{ paddingBottom: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: s.weight, color: s.color }}>{step.label}</div>
                      <div style={{ fontSize: 11, opacity: 0.55 }}>{step.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card elev-sm" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <PlaceholderPhoto label="PHOTO" height={48} circle fontSize={7} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>Your technician</div>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>Dan Hart</div>
              <div style={{ fontSize: 11, opacity: 0.55 }}>Service Technician · 12 yrs with PSI</div>
            </div>
            <div style={{ display: 'flex', gap: 6, flex: 'none' }}>
              <TagLink href="tel:8003301200">Call</TagLink>
              <TagButton onClick={() => navigate('/account/messages')}>Message</TagButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
