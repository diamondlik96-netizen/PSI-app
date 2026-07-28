import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { industries, productTypes, projectCover, projects } from '../../data/seed';
import { Tag } from '../../components/ui/Tag';
import { Photo, PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';

const INDUSTRY_FILTERS = ['All', ...industries];
const PRODUCT_FILTERS = ['All', ...productTypes];

export function PortfolioScreen() {
  const navigate = useNavigate();
  const [filterIndustry, setFilterIndustry] = useState('All');
  const [filterProduct, setFilterProduct] = useState('All');
  const filteredProjects = projects.filter(
    (p) => (filterIndustry === 'All' || p.industry === filterIndustry) && (filterProduct === 'All' || p.productType === filterProduct),
  );

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <h2>Project Portfolio</h2>
      <p style={{ opacity: 0.75, maxWidth: 640 }}>
        Operable partitions, athletic equipment, and gymnasium builds across hotels, school districts, and municipal facilities.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', margin: 'var(--space-4) 0' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {INDUSTRY_FILTERS.map((label) => (
            <button key={label} className="cw-chip" data-active={filterIndustry === label} onClick={() => setFilterIndustry(label)}>
              {label}
            </button>
          ))}
        </div>
        <div className="hr" style={{ height: 'auto', width: 1, background: 'var(--color-divider)', margin: '0 4px' }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {PRODUCT_FILTERS.map((label) => (
            <button key={label} className="cw-chip" data-active={filterProduct === label} onClick={() => setFilterProduct(label)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-4)' }}>
        {filteredProjects.map((proj) => {
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
      {filteredProjects.length === 0 && <p style={{ opacity: 0.6, padding: 'var(--space-6) 0' }}>No projects match those filters yet.</p>}
    </section>
  );
}
