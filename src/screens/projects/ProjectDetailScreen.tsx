import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../../data/seed';
import { Tag } from '../../components/ui/Tag';
import { Photo, PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';

export function ProjectDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div style={{ padding: 16 }}>
        <button className="btn btn-ghost" onClick={() => navigate('/projects')}>← Projects</button>
        <p>Project not found.</p>
      </div>
    );
  }

  const gallery = (project.photos ?? []).slice(1);

  return (
    <div>
      <button className="btn btn-ghost" style={{ margin: '8px 8px 0' }} onClick={() => navigate('/projects')}>
        ← Projects
      </button>
      {project.photo ? <Photo src={project.photo} alt={project.name} height={200} /> : <PlaceholderPhoto label="PROJECT PHOTO" height={200} />}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <Tag variant="accent">{project.industry}</Tag>
          <Tag variant="neutral">{project.productType}</Tag>
        </div>
        <h4 style={{ margin: 0 }}>{project.name}</h4>
        <div style={{ fontSize: 12, opacity: 0.55 }}>{project.location}</div>
        <p style={{ fontSize: 14, margin: 0 }}>{project.summary}</p>

        {project.stats && project.stats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, borderTop: '2px solid #1a1a1a', paddingTop: 12 }}>
            {project.stats.map((ps, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, color: 'var(--color-accent)' }}>{ps.value}</div>
                <div style={{ fontSize: 10.5, opacity: 0.65 }}>{ps.label}</div>
              </div>
            ))}
          </div>
        )}

        {gallery.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {gallery.map((ph, i) => (
              <figure key={i} style={{ margin: 0 }}>
                <div role="img" aria-label={ph.caption} style={{ height: 180, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url('${ph.src}')` }} />
                <figcaption style={{ fontSize: 11, opacity: 0.6, padding: '5px 0' }}>{ph.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <button className="btn btn-primary btn-block" onClick={() => navigate('/quote')}>
          Request a similar quote
        </button>
      </div>
    </div>
  );
}
