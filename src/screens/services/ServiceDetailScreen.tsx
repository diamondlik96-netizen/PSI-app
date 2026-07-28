import { useNavigate, useParams } from 'react-router-dom';
import { services } from '../../data/seed';
import { Photo } from '../../components/ui/PlaceholderPhoto';

export function ServiceDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div style={{ padding: 16 }}>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>← Back</button>
        <p>Service not found.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button className="btn btn-ghost" style={{ alignSelf: 'flex-start', margin: '8px 8px 0' }} onClick={() => navigate('/')}>
        ← Back
      </button>
      {service.photo && <Photo src={service.photo} alt={service.name} height={190} grayscale={false} style={{ marginTop: 8 }} />}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <h4 style={{ margin: 0, color: 'var(--color-accent)', textTransform: 'uppercase' }}>{service.name}</h4>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14, marginTop: 4 }}>{service.tagline}</div>
        </div>
        {service.paras.map((para, i) => (
          <p key={i} style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, opacity: 0.8 }}>
            {para}
          </p>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #1a1a1a' }}>
          {service.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '9px 2px', borderBottom: '1px solid var(--color-divider)', fontSize: 12.5 }}>
              <span style={{ color: 'var(--color-accent)', flex: 'none' }}>■</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
          <button className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '13px 16px', fontSize: 15 }} onClick={() => navigate('/quote')}>
            Request a Quote →
          </button>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '13px 16px' }} onClick={() => navigate('/schedule')}>
            Schedule Service →
          </button>
          <a href="tel:8003301200" className="btn btn-ghost" style={{ alignSelf: 'flex-start', textDecoration: 'none' }}>
            Or call (800) 330-1200
          </a>
        </div>
      </div>
    </div>
  );
}
