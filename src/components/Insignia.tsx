import type { ReactNode } from "react";

interface Props {
  clase?: string;
  children: ReactNode;
}

function Insignia({ clase = "badge bg-secondary me-1", children }: Props) {
  return <span className={clase}>{children}</span>;
}

export default Insignia;
