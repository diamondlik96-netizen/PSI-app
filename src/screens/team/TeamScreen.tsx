import { useState } from 'react';
import { team } from '../../data/seed';
import { Chip } from '../../components/ui/Chip';
import { TagLink } from '../../components/ui/Tag';
import { PlaceholderPhoto } from '../../components/ui/PlaceholderPhoto';

const TEAM_GROUPS = ['All', 'Company Leadership', 'Sales', 'Project Management', 'Scheduling', 'Service', 'Installation', 'Accounts'];

export function TeamScreen() {
  const [teamFilter, setTeamFilter] = useState('All');
  const filteredTeam = team.filter((m) => teamFilter === 'All' || m.region === teamFilter);

  return (
    <div style={{ padding: 16 }}>
      <h4 style={{ margin: '0 0 4px' }}>Our Team</h4>
      <p style={{ margin: '0 0 12px', fontSize: 13, opacity: 0.65 }}>"Our Team is Your Team" — 150+ years of combined experience.</p>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 }}>
        {TEAM_GROUPS.map((group) => (
          <Chip key={group} active={teamFilter === group} onClick={() => setTeamFilter(group)}>
            {group === 'Company Leadership' ? 'Leadership' : group}
          </Chip>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredTeam.map((member) => (
          <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--color-divider)' }}>
            <PlaceholderPhoto label="PHOTO" height={40} circle fontSize={7} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{member.name}</div>
              <div style={{ fontSize: 11, opacity: 0.55 }}>{member.role}</div>
            </div>
            <TagLink href="tel:8003301200">Call</TagLink>
          </div>
        ))}
      </div>
    </div>
  );
}
