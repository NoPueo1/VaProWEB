import type { ReactNode } from "react";

interface Props {
  clase?: string;
  children: ReactNode;
  alHacerClick?: () => void;
  tipo?: "button" | "submit" | "reset";
}

function Boton({
  clase = "btn btn-morado w-100 fw-bold mb-3 py-2",
  children,
  alHacerClick,
  tipo = "button",
}: Props) {
  return (
    <button type={tipo} className={clase} onClick={alHacerClick}>
      {children}
    </button>
  );
}

export default Boton;
