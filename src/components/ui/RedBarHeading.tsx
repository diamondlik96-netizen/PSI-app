import type { ReactNode } from 'react';

export function RedBarHeading({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, ...style }}>
      <span style={{ width: 26, height: 3, background: 'var(--color-accent)', flex: 'none' }} />
      <h6 style={{ margin: 0 }}>{children}</h6>
    </div>
  );
}
