import { useNavigate, useParams } from 'react-router-dom';
import { services } from '../../data/seed';
import { Photo } from '../../components/ui/PlaceholderPhoto';

export function ServiceDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>← Back to services</button>
        <p>Service not found.</p>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <button className="btn btn-ghost" onClick={() => navigate('/')}>← Back to services</button>
      {service.photo && <Photo src={service.photo} alt={service.name} height={300} grayscale={false} style={{ marginTop: 'var(--space-3)' }} />}
      <h2 style={{ color: 'var(--color-accent)', textTransform: 'uppercase', marginTop: 'var(--space-4)' }}>{service.name}</h2>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, marginTop: 4 }}>{service.tagline}</div>
      <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        {service.paras.map((para, i) => (
          <p key={i} style={{ margin: 0, fontSize: 15, lineHeight: 1.6, opacity: 0.85 }}>{para}</p>
        ))}
      </div>
      <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', borderTop: '2px solid #1a1a1a', marginTop: 'var(--space-4)' }}>
        {service.bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 2px', borderBottom: '1px solid var(--color-divider)', fontSize: 14 }}>
            <span style={{ color: 'var(--color-accent)', flex: 'none' }}>■</span>
            <span>{b}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
        <button className="btn btn-primary" onClick={() => navigate('/quote')}>Request a Quote</button>
        <button className="btn btn-secondary" onClick={() => navigate('/schedule')}>Schedule Service</button>
        <a href="tel:8003301200" className="btn btn-ghost" style={{ textDecoration: 'none' }}>Or call (800) 330-1200</a>
      </div>
    </section>
  );
}
