import type { ReactNode } from "react";

interface Props {
  tipo?: "success" | "danger" | "warning" | "info";
  children: ReactNode;
  alCerrar?: () => void;
}

function Alerta({ tipo = "success", children, alCerrar }: Props) {
  return (
    <div
      className={`alert alert-${tipo} alert-dismissible fade show mb-4`}
      role="alert"
    >
      {children}
      {alCerrar && (
        <button
          type="button"
          className="btn-close"
          onClick={alCerrar}
          aria-label="Cerrar"
        />
      )}
    </div>
  );
}

export default Alerta;
