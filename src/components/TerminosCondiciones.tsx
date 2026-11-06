import { useNavigate } from "react-router-dom";

interface Props {
  alVolver?: () => void;
}

function TerminosCondiciones({ alVolver }: Props) {
  const navigate = useNavigate();

  const manejarVolver = () => {
    if (alVolver) {
      alVolver();
    } else {
      navigate(-1);
    }
  };

  return (
    <main className="container my-5">
      <button
        type="button"
        className="btn btn-outline-light mb-4"
        onClick={manejarVolver}
      >
        &larr; Volver
      </button>

      <div className="bg-dark bg-opacity-75 p-4 p-md-5 rounded-4 shadow-lg border border-secondary border-opacity-25">
        <h1 className="display-5 fw-bold text-white mb-4 border-bottom border-primary pb-3">
          Términos y Condiciones
        </h1>
        <p className="text-white-50 mb-5">
          Última actualización: 15 de Septiembre de 2026
        </p>

        <div className="text-light fs-5" style={{ lineHeight: "1.8" }}>
          <p>
            Bienvenido a <strong>Vapro</strong>, una plataforma operada por la{" "}
            <strong>Provoste-Vasquez Corporation</strong>. Al registrarte, acceder o
            utilizar nuestra tienda de videojuegos y servicios asociados, aceptas
            estar sujeto a los siguientes Términos y Condiciones. Te recomendamos
            leerlos detenidamente antes de realizar cualquier transacción.
          </p>

          <h3 className="fw-bold text-white mt-5 mb-3">1. Cuentas de Usuario</h3>
          <p>
            Para realizar compras y acceder a funciones avanzadas, el usuario debe
            crear una cuenta proporcionando información verídica, vigente y
            completa. El resguardo de la confidencialidad de la contraseña es
            responsabilidad exclusiva del titular de la cuenta.
          </p>

          <h3 className="fw-bold text-white mt-5 mb-3">2. Compras y Pagos</h3>
          <p>
            Todos los precios publicados en el catálogo están expresados en pesos
            chilenos (CLP) e incluyen los impuestos aplicables. Una vez confirmada la
            transacción, las licencias digitales se activan de manera inmediata en la
            biblioteca del cliente.
          </p>

          <h3 className="fw-bold text-white mt-5 mb-3">
            3. Política de Reembolsos
          </h3>
          <p>
            Los clientes tienen derecho a solicitar el reembolso de compras digitales
            dentro de los primeros 14 días posteriores a la transacción, siempre que
            el tiempo de juego acumulado sea inferior a 2 horas.
          </p>
        </div>
      </div>
    </main>
  );
}

export default TerminosCondiciones;
