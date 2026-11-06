import { Link } from "react-router-dom";

function PaginaNoEncontrada() {
  return (
    <div className="container text-center py-5 my-5">
      <div className="card card-admin p-5 mx-auto" style={{ maxWidth: "600px" }}>
        <h1 className="display-1 fw-bold text-morado mb-3" style={{ color: "#a855f7" }}>
          404
        </h1>
        <h2 className="text-white mb-3">Página no encontrada</h2>
        <p className="text-white-50 mb-4">
          La ruta a la que estás intentando acceder no existe o fue movida.
        </p>
        <div>
          <Link to="/" className="btn btn-morado px-4 py-2">
            Volver a la Página Principal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaginaNoEncontrada;
