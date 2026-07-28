import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'accent' | 'neutral';

export function Tag({
  variant = 'neutral',
  children,
  style,
}: {
  variant?: Variant;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return <span className={`tag tag-${variant}`} style={style}>{children}</span>;
}

export function TagLink({
  variant = 'accent',
  children,
  ...rest
}: { variant?: Variant } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`tag tag-${variant}`} style={{ textDecoration: 'none', flex: 'none' }} {...rest}>
      {children}
    </a>
  );
}

export function TagButton({
  variant = 'neutral',
  children,
  ...rest
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`tag tag-${variant}`} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }} {...rest}>
      {children}
    </button>
  );
}
