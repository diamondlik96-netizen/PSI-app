import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { industries, projectCover, projects } from '../../data/seed';
import { Chip } from '../../components/ui/Chip';
import { Tag } from '../../components/ui/Tag';
import { Photo, PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';

const FILTERS = ['All', ...industries];

export function ProjectsScreen() {
  const navigate = useNavigate();
  const [filterIndustry, setFilterIndustry] = useState('All');
  const filteredProjects = projects.filter((p) => filterIndustry === 'All' || p.industry === filterIndustry);

  return (
    <div style={{ padding: '16px 0' }}>
      <h4 style={{ padding: '0 16px', marginBottom: 10 }}>Projects</h4>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 12px' }}>
        {FILTERS.map((label) => (
          <Chip key={label} active={filterIndustry === label} onClick={() => setFilterIndustry(label)}>
            {label}
          </Chip>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 16px' }}>
        {filteredProjects.map((proj) => {
          const cover = projectCover(proj);
          return (
          <div key={proj.id} className="card elev-sm" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/projects/${proj.id}`)}>
            {cover ? <Photo src={cover} alt={proj.name} height={130} /> : <PlaceholderPhoto label="PROJECT PHOTO" height={130} />}
            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <Tag variant="accent">{proj.industry}</Tag>
                <Tag variant="neutral">{proj.productType}</Tag>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14 }}>{proj.name}</div>
              <div style={{ fontSize: 11, opacity: 0.55 }}>{proj.location}</div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
