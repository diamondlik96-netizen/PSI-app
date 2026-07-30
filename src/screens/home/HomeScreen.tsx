import { useNavigate } from 'react-router-dom';
import { heroPhoto, projectCover, projects, services } from '../../data/seed';
import { useAppState } from '../../state/AppStateContext';
import { useAuth } from '../../state/AuthContext';
import { RedBarHeading } from '../../components/ui/RedBarHeading';
import { Tag } from '../../components/ui/Tag';
import { Photo, PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';

export function HomeScreen() {
  const navigate = useNavigate();
  const { state } = useAppState();
  const { isDemoMode } = useAuth();
  const hasUpcoming = isDemoMode && state.appointments.length > 0;
  const nextAppt = state.appointments[0];
  const featuredProjects = projects.slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* hero: full-bleed project photo, black scrim, red type */}
      <div style={{ position: 'relative', minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', background: '#0d0c0c' }}>
        <img
          className="grayscale"
          src={heroPhoto}
          alt="PSI operable wall installation, Vinoy Resort"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,12,12,.1) 20%, rgba(13,12,12,.92) 82%)' }} />
        <div style={{ position: 'relative', padding: '24px 18px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 26, height: 3, background: 'var(--color-accent)', flex: 'none' }} />
            <span style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#fff', opacity: 0.85 }}>
              Precision Service &amp; Installation
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: 31, lineHeight: 1.04, color: '#fff', textTransform: 'uppercase' }}>
            #1 Distributor
            <br />
            &amp; Servicer of
            <br />
            <span style={{ color: 'var(--color-accent-400)' }}>Hufcor Airwall</span> Panels
          </h2>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: '#fff', opacity: 0.75 }}>
            Operable walls and gymnasium equipment — sold, installed, and serviced 24/7, 365 days a year.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            <button className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '13px 16px', fontSize: 15 }} onClick={() => navigate('/quote')}>
              Request a Quote →
            </button>
            <button
              className="btn"
              style={{ justifyContent: 'flex-start', padding: '13px 16px', fontSize: 15, border: '1px solid rgba(255,255,255,.55)', color: '#fff' }}
              onClick={() => navigate('/schedule')}
            >
              Schedule a Service Call →
            </button>
            <button
              className="btn"
              style={{ justifyContent: 'flex-start', padding: '13px 16px', fontSize: 15, border: '1px solid rgba(255,255,255,.55)', color: '#fff' }}
              onClick={() => navigate('/report-issue')}
            >
              Report an Issue with Photos →
            </button>
          </div>
        </div>
      </div>

      {/* red stat band */}
      <div style={{ background: 'var(--color-accent)', color: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '16px 18px', gap: 8 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19 }}>150+</div>
          <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.06em', opacity: 0.85 }}>yrs experience</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19 }}>24/7</div>
          <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.06em', opacity: 0.85 }}>emergency svc</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19 }}>Nat'l</div>
          <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.06em', opacity: 0.85 }}>coverage</div>
        </div>
      </div>

      {hasUpcoming && (
        <div style={{ padding: '18px 16px 0' }}>
          <h6 style={{ color: 'var(--color-accent)', marginBottom: 8 }}>Good afternoon, Vinoy Resort — next appointment</h6>
          <div className="card elev-sm" style={{ gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Tag variant="accent">{nextAppt.type}</Tag>
              <Tag variant="neutral">{nextAppt.status}</Tag>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14 }}>{nextAppt.product}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{nextAppt.date} · {nextAppt.time}</div>
          </div>
        </div>
      )}

      {/* what we do */}
      <div style={{ padding: '22px 16px 6px' }}>
        <RedBarHeading style={{ marginBottom: 12 }}>
          <span style={{ color: '#1a1a1a' }}>What we do</span>
        </RedBarHeading>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #1a1a1a' }}>
          {[
            { title: 'Operable Wall Panels', sub: 'Hufcor & all major manufacturers — install, repair, restore' },
            { title: 'Basketball & Volleyball Systems', sub: 'Backstops, nets, wall padding, full gym packages' },
            { title: 'Bleachers & Divider Curtains', sub: 'Telescoping seating, compliance upgrades, motorized curtains' },
          ].map((line) => (
            <button
              key={line.title}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '14px 2px', border: 'none', borderBottom: '1px solid var(--color-divider)', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}
              onClick={() => navigate('/quote')}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14.5 }}>{line.title}</div>
                <div style={{ fontSize: 11.5, opacity: 0.6 }}>{line.sub}</div>
              </div>
              <span style={{ color: 'var(--color-accent)', fontSize: 18, flex: 'none' }}>→</span>
            </button>
          ))}
        </div>
      </div>

      {/* services: Repair. Restore. Renew. */}
      <div style={{ padding: '26px 16px 8px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 26, lineHeight: 1.05, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '-.01em' }}>
            Repair. Restore.
            <br />
            Renew.
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 12, opacity: 0.6 }}>Creating &amp; maintaining memorable spaces</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {services.map((svc) => (
            <div
              key={svc.id}
              style={{ background: '#fff', border: '1px solid var(--color-divider)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => navigate(`/services/${svc.id}`)}
            >
              {svc.photo ? <Photo src={svc.photo} alt={svc.name} height={84} grayscale={false} /> : <PlaceholderPhoto label={`SERVICE PHOTO —\n${svc.name}`} height={84} />}
              <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13, color: 'var(--color-accent)', lineHeight: 1.15 }}>{svc.name}</div>
                <div style={{ fontSize: 11, lineHeight: 1.45, opacity: 0.7, flex: 1 }}>{svc.blurb}</div>
                <span style={{ fontSize: 11, color: 'var(--color-accent)', fontWeight: 600 }}>Learn more →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* recent projects */}
      <div style={{ padding: '18px 0 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 16px 10px' }}>
          <RedBarHeading style={{ marginBottom: 0 }}>Recent projects</RedBarHeading>
          <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => navigate('/projects')}>
            See all
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 16px 6px' }}>
          {featuredProjects.map((proj) => {
            const cover = projectCover(proj);
            return (
            <div key={proj.id} style={{ width: 230, flex: 'none', cursor: 'pointer', background: '#1a1a1a', color: '#fff', overflow: 'hidden' }} onClick={() => navigate(`/projects/${proj.id}`)}>
              {cover ? <Photo src={cover} alt={proj.name} height={120} /> : <PlaceholderPhoto label="PROJECT PHOTO" height={120} />}
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{ fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent-400)' }}>{proj.industry}</span>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 12.5, lineHeight: 1.25 }}>{proj.name}</div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* black emergency band */}
      <div style={{ background: '#0d0c0c', color: '#fff', padding: '22px 18px', marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19, textTransform: 'uppercase' }}>Wall down before an event?</div>
        <p style={{ margin: 0, fontSize: 12.5, opacity: 0.7 }}>We rescue operable air wall systems — 24 hours a day, 365 days a year.</p>
        <a href="tel:8003301200" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8, textDecoration: 'none' }}>
          Call (800) 330-1200
        </a>
      </div>
    </div>
  );
}
