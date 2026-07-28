import { team } from '../../data/seed';
import { PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';

export function TeamScreen() {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <h2>Our Team</h2>
      <p style={{ opacity: 0.75, maxWidth: 640 }}>Your points of contact across sales, service, and installation.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        {team.map((member) => (
          <div key={member.id} className="card elev-sm">
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <PlaceholderPhoto label="PHOTO" height={56} circle fontSize={9} />
              <div>
                <div className="card-title" style={{ fontSize: 16 }}>{member.name}</div>
                <div className="card-meta">{member.role}</div>
              </div>
            </div>
            <div className="hr" style={{ margin: 'var(--space-2) 0' }} />
            <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span>{member.region}</span>
              <a href={`tel:${member.phone.replace(/\D/g, '')}`}>{member.phone}</a>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
