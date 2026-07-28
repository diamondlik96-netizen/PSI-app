import { useNavigate } from 'react-router-dom';
import { clientLogos, projectCover, projects, services } from '../../data/seed';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import { Tag } from '../../components/ui/Tag';
import { Photo, PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';

const STATS = [
  { value: '150+', label: 'years combined team experience' },
  { value: '#1', label: 'Hufcor distributor & servicer' },
  { value: '5', label: 'industries served nationwide' },
  { value: '24/7', label: 'emergency service, 365 days a year' },
];

const LINES_OF_BUSINESS = [
  { kicker: 'Interiors', title: 'Operable Wall Panels', body: 'Hufcor and all major-manufacturer airwalls — installation, preventive maintenance, 24/7 emergency repair, and remediation.' },
  { kicker: 'Athletics', title: 'Basketball & Volleyball Systems', body: 'Electric and manual backstops, height-adjustable volleyball systems, wall padding, and full gym packages.' },
  { kicker: 'Athletics', title: 'Bleachers & Divider Curtains', body: 'Telescoping bleachers, compliance upgrades, and motorized divider curtains for multi-court gyms.' },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const { canInstall, isIOS, installed, promptInstall } = useInstallPrompt();
  const featuredProjects = projects.slice(0, 3);

  return (
    <section>
      {/* full-bleed color hero, headline overlapping the photo edge */}
      <div style={{ position: 'relative' }}>
        <div style={{ height: 440, backgroundImage: "url('/assets/hero-ballroom.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(255,255,255,.9) 100%)' }} />
        <div style={{ maxWidth: 1200, margin: '-110px auto 0', position: 'relative', padding: '0 var(--space-4)' }}>
          <h1 style={{ fontSize: 'clamp(44px,6vw,84px)', lineHeight: 0.96, textTransform: 'uppercase', color: 'var(--color-accent)', margin: 0, letterSpacing: '-.01em' }}>
            #1 Distributor &amp; Servicer of Hufcor Airwall Panels
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 'var(--space-8)', alignItems: 'center' }}>
        <div>
          <h4 style={{ textTransform: 'uppercase', margin: '0 0 var(--space-2)' }}>At PSI we rescue operable air wall systems</h4>
          <p style={{ fontSize: 16, maxWidth: 560, opacity: 0.85 }}>
            Precision Service &amp; Installation (PSI) has earned a national reputation as one of the industry's most experienced specialists in Hufcor® operable air walls —
            selling, installing, and servicing operable partitions and gymnasium equipment for hospitality, education, recreation, government, and commercial clients
            nationwide, 24/7, 365 days a year.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/quote')}>Request a Quote</button>
            <button className="btn btn-secondary" onClick={() => navigate('/schedule')}>Schedule a Service Call</button>
            <button className="btn btn-secondary" onClick={() => navigate('/report-issue')}>Report an Issue with Photos</button>
          </div>
          <a
            href="tel:8003301200"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--color-accent)', color: '#fff', padding: '12px 20px', marginTop: 'var(--space-4)', textDecoration: 'none', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18 }}
          >
            (800) 330-1200 — 24/7, 365
          </a>
        </div>
        <img
          src="https://psicrew.com/wp-content/uploads/2026/07/PSI-ABOUT-HUFCOR-About-Us.jpg"
          alt="PSI operable wall installation"
          style={{ height: 340, width: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="hr" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-4)' }}>
        {STATS.map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 34, color: 'var(--color-accent)' }}>{s.value}</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="hr" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <h6 style={{ color: 'var(--color-accent)' }}>What we do</h6>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {LINES_OF_BUSINESS.map((line) => (
            <div className="card elev-sm" key={line.title}>
              <div className="card-kicker">{line.kicker}</div>
              <div className="card-title">{line.title}</div>
              <p className="card-body">{line.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hr" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <div style={{ textAlign: 'left', marginBottom: 'var(--space-4)' }}>
          <h2 style={{ color: 'var(--color-accent)', textTransform: 'uppercase', margin: 0 }}>Repair. Restore. Renew.</h2>
          <p style={{ margin: '6px 0 0', opacity: 0.6, fontSize: 14 }}>Creating &amp; maintaining memorable spaces</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-4)' }}>
          {services.map((svc) => (
            <div key={svc.id} className="card elev-sm" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/services/${svc.id}`)}>
              {svc.photo ? <Photo src={svc.photo} alt={svc.name} height={110} grayscale={false} /> : <PlaceholderPhoto label={`SERVICE PHOTO —\n${svc.name}`} height={110} />}
              <div style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="card-title" style={{ fontSize: 14, color: 'var(--color-accent)' }}>{svc.name}</div>
                <p className="card-body" style={{ fontSize: 12, margin: 0 }}>{svc.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hr" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h6 style={{ color: 'var(--color-accent)' }}>Featured projects</h6>
          <button className="btn btn-ghost" onClick={() => navigate('/projects')}>View full portfolio</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {featuredProjects.map((proj) => {
            const cover = projectCover(proj);
            return (
            <div key={proj.id} className="card elev-sm" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/projects/${proj.id}`)}>
              {cover ? <Photo src={cover} alt={proj.name} height={150} style={{ width: '100%' }} /> : <PlaceholderPhoto label="PROJECT PHOTO" height={150} />}
              <div style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Tag variant="accent">{proj.industry}</Tag>
                  <Tag variant="neutral">{proj.productType}</Tag>
                </div>
                <div className="card-title" style={{ fontSize: 15 }}>{proj.name}</div>
                <div className="card-meta">{proj.location}</div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <h6 style={{ color: 'var(--color-accent)' }}>Trusted by</h6>
        <div className="cw-logostrip grayscale" style={{ marginTop: 'var(--space-3)' }}>
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              role="img"
              aria-label={logo.name}
              style={{ width: 100, height: 36, opacity: 0.75, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url('${logo.src}')` }}
            />
          ))}
        </div>
      </div>

      {/* Get the PSI app */}
      <div style={{ background: '#0d0c0c', marginTop: 'var(--space-6)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-6)', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-accent-400)', marginBottom: 6 }}>PSI in your pocket</div>
            <h3 style={{ color: '#fff', margin: '0 0 6px' }}>Get the PSI mobile app</h3>
            <p style={{ color: '#fff', opacity: 0.7, fontSize: 14, maxWidth: 520, margin: 0 }}>
              Schedule service, request quotes, report issues with photos, track your technician, and pay invoices — right from your phone.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              {installed ? (
                <span style={{ color: '#fff', fontSize: 13, opacity: 0.8 }}>You already have it installed ✓</span>
              ) : canInstall ? (
                <button className="btn btn-primary" onClick={promptInstall}>Install the app</button>
              ) : isIOS ? (
                <div style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '10px 14px', fontSize: 12, opacity: 0.85 }}>
                  On your iPhone/iPad: tap Share <span aria-hidden>⬆</span> then <strong>Add to Home Screen</strong> — the app installs like any other.
                </div>
              ) : (
                <div style={{ border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '10px 14px', fontSize: 12, opacity: 0.85 }}>
                  Open this page in Chrome or Edge, then use the browser menu's "Install app" / "Add to Home Screen" option.
                </div>
              )}
            </div>
          </div>
          <div style={{ width: 120, height: 220, border: '2px solid rgba(255,255,255,.25)', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, flex: 'none' }}>
            <img src="/assets/psi-logo.png" alt="PSI app" style={{ width: 70, height: 'auto', background: '#fff', padding: 6 }} />
            <span style={{ color: '#fff', fontSize: 10, opacity: 0.6 }}>PSI Customer App</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--color-accent)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-8) var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          <h2 style={{ color: 'var(--color-bg)', maxWidth: 600, margin: 0 }}>Need something fixed, replaced, or quoted? We'll take it from here.</h2>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flex: 'none' }}>
            <button className="btn" style={{ background: 'var(--color-bg)', color: 'var(--color-accent-700)' }} onClick={() => navigate('/quote')}>Request a Quote</button>
            <button className="btn" style={{ border: '1px solid var(--color-bg)', color: 'var(--color-bg)' }} onClick={() => navigate('/schedule')}>Schedule Service</button>
          </div>
        </div>
      </div>

      <footer style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)', fontSize: 12, opacity: 0.6 }}>
        Precision Service &amp; Installation, LLC (PSI) — Operable wall systems &amp; gymnasium equipment. Sales, installation, and 24/7 service nationwide. (800) 330-1200
      </footer>
    </section>
  );
}
