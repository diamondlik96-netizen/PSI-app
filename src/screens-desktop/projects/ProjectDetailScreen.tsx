import { useNavigate, useParams } from 'react-router-dom';
import { projectCover, projects } from '../../data/seed';
import { Tag } from '../../components/ui/Tag';
import { Photo, PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';
import { PhotoGallery } from '../../components/ui/PhotoGallery';

export function ProjectDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
        <button className="btn btn-ghost" onClick={() => navigate('/projects')}>← Back to portfolio</button>
        <p>Project not found.</p>
      </section>
    );
  }

  const cover = projectCover(project);

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <button className="btn btn-ghost" onClick={() => navigate('/projects')}>← Back to portfolio</button>
      {cover ? (
        <Photo src={cover} alt={project.name} height={320} style={{ width: '100%', marginTop: 'var(--space-3)' }} />
      ) : (
        <PlaceholderPhoto label={`PROJECT PHOTO — ${project.name}`} height={320} style={{ marginTop: 'var(--space-3)' }} />
      )}
      <div style={{ display: 'flex', gap: 6, marginTop: 'var(--space-4)' }}>
        <Tag variant="accent">{project.industry}</Tag>
        <Tag variant="neutral">{project.productType}</Tag>
      </div>
      <h2 style={{ marginTop: 'var(--space-2)' }}>{project.name}</h2>
      <div className="card-meta" style={{ marginBottom: 'var(--space-3)' }}>{project.location}</div>
      <p style={{ fontSize: 16, maxWidth: 640 }}>{project.summary}</p>

      {project.stats && project.stats.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-4)', borderTop: '2px solid #1a1a1a', borderBottom: '1px solid var(--color-divider)', padding: 'var(--space-4) 0', marginTop: 'var(--space-4)' }}>
          {project.stats.map((ps, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 30, color: 'var(--color-accent)' }}>{ps.value}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{ps.label}</div>
            </div>
          ))}
        </div>
      )}

      {project.photos.length > 1 && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <h6 style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>Photos</h6>
          <PhotoGallery photos={project.photos} alt={project.name} />
        </div>
      )}

      {project.testimonial && (
        <div className="card elev-sm" style={{ borderLeft: '2px solid var(--color-accent)', maxWidth: 640, marginTop: 'var(--space-4)' }}>
          <p className="card-body" style={{ fontStyle: 'italic' }}>{project.testimonial}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
        <button className="btn btn-primary" onClick={() => navigate('/quote')}>Request a similar quote</button>
      </div>
    </section>
  );
}
