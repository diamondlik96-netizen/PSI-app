export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button className="m-chip" data-active={active} onClick={onClick}>
      {children}
    </button>
  );
}
