import { Link } from "react-router-dom";
import { PAGINAS } from "../data/Paginas";
import type { Usuario } from "../services/storage";
import Boton from "./Boton";
import Insignia from "./Insignia";

interface Props {
  paginaActual: string;
  alCambiarPagina: (nuevaPagina: string) => void;
  cantidadCarrito?: number;
  alAbrirCarrito?: () => void;
  usuarioActual: Usuario | null;
  alCerrarSesion: () => void;
}

function Navbar({
  paginaActual,
  alCambiarPagina,
  cantidadCarrito = 0,
  alAbrirCarrito,
  usuarioActual,
  alCerrarSesion,
}: Props) {
  const esAdminOVendedor =
    usuarioActual &&
    (usuarioActual.rol === "Administrador" ||
      usuarioActual.rol === "Vendedor");

  return (
    <header className="py-3 mb-4">
      <div className="container-fluid d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link
            to="/"
            onClick={() => alCambiarPagina("Inicio")}
            className="d-inline-flex align-items-center text-decoration-none brand-container"
          >
            <img
              src="/Assets/logo.png"
              alt="Logo Vapro"
              className="brand-logo-img me-2"
            />
            <img
              src="/Assets/logo-letras.png"
              alt="VaPro"
              className="brand-text-img"
            />
          </Link>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {/* Recorremos el arreglo de páginas definido en Paginas.ts */}
          {PAGINAS.map((pag) => (
            <li key={pag.ruta} className="nav-item">
              <Link
                to={pag.ruta}
                className={`nav-link px-2 ${
                  paginaActual === pag.nombreCorto
                    ? "fw-bold text-white active"
                    : "text-light"
                }`}
                onClick={() => alCambiarPagina(pag.nombreCorto)}
              >
                {pag.nombre}
              </Link>
            </li>
          ))}
        </ul>

        <div className="col-md-4 text-end d-flex align-items-center justify-content-end">
          <Boton
            clase="btn btn-outline-light me-2 position-relative"
            alHacerClick={alAbrirCarrito}
          >
            Carrito
            {cantidadCarrito > 0 && (
              <Insignia clase="badge bg-danger rounded-pill badge-carrito-total ms-2">
                {cantidadCarrito}
              </Insignia>
            )}
          </Boton>

          {!usuarioActual ? (
            <div className="d-inline-flex align-items-center">
              <Link
                to="/login"
                className={`btn btn-outline-light me-2 ${
                  paginaActual === "Login" ? "active" : ""
                }`}
                onClick={() => alCambiarPagina("Login")}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                className={`btn btn-morado ${
                  paginaActual === "Registro" ? "active" : ""
                }`}
                onClick={() => alCambiarPagina("Registro")}
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <div className="d-inline-flex align-items-center">
              <span className="text-light me-2 small">
                Hola, <strong>{usuarioActual.nombre}</strong>
              </span>
              {esAdminOVendedor && (
                <Link
                  to="/admin"
                  className={`btn btn-sm btn-outline-info me-2 fw-bold ${
                    paginaActual === "Admin" ? "active" : ""
                  }`}
                  onClick={() => alCambiarPagina("Admin")}
                >
                  Panel Admin
                </Link>
              )}
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={alCerrarSesion}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
