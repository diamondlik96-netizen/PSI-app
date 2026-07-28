export function PlaceholderPhoto({
  label,
  height,
  circle,
  fontSize,
  style,
}: {
  label: string;
  height: number;
  circle?: boolean;
  fontSize?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="m-placeholder grayscale"
      style={{
        height,
        width: circle ? height : undefined,
        borderRadius: circle ? '50%' : undefined,
        flex: circle ? 'none' : undefined,
        fontSize,
        ...style,
      }}
    >
      {label}
    </div>
  );
}

export function Photo({
  src,
  alt,
  height,
  grayscale = true,
  style,
}: {
  src: string;
  alt: string;
  height: number;
  grayscale?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={grayscale ? 'grayscale' : undefined}
      role="img"
      aria-label={alt}
      style={{ height, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url('${src}')`, ...style }}
    />
  );
}
