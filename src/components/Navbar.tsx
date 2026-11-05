import type { Usuario } from "../services/storage";
import Boton from "./Boton";
import Insignia from "./Insignia";

interface Props {
  seccionActiva: string;
  alCambiarSeccion: (seccion: string) => void;
  cantidadCarrito?: number;
  alAbrirCarrito?: () => void;
  usuarioActual: Usuario | null;
  alCerrarSesion: () => void;
}

function Navbar({
  seccionActiva,
  alCambiarSeccion,
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
          <div
            role="button"
            tabIndex={0}
            onClick={() => alCambiarSeccion("inicio")}
            className="d-inline-flex align-items-center text-decoration-none brand-container"
            style={{ cursor: "pointer" }}
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
          </div>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <button
              type="button"
              className={`nav-link px-2 ${
                seccionActiva === "inicio" ? "fw-bold text-white" : "text-light"
              } bg-transparent border-0`}
              onClick={() => alCambiarSeccion("inicio")}
            >
              Pagina Principal
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link px-2 ${
                seccionActiva === "productos"
                  ? "fw-bold text-white"
                  : "text-light"
              } bg-transparent border-0`}
              onClick={() => alCambiarSeccion("productos")}
            >
              Productos
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link px-2 ${
                seccionActiva === "nosotros" ? "fw-bold text-white" : "text-light"
              } bg-transparent border-0`}
              onClick={() => alCambiarSeccion("nosotros")}
            >
              Sobre Nosotros
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link px-2 ${
                seccionActiva === "blog" ? "fw-bold text-white" : "text-light"
              } bg-transparent border-0`}
              onClick={() => alCambiarSeccion("blog")}
            >
              Blog
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link px-2 ${
                seccionActiva === "contacto" ? "fw-bold text-white" : "text-light"
              } bg-transparent border-0`}
              onClick={() => alCambiarSeccion("contacto")}
            >
              Contacto
            </button>
          </li>
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
              <Boton
                clase={`btn btn-outline-light me-2 ${
                  seccionActiva === "login" ? "active" : ""
                }`}
                alHacerClick={() => alCambiarSeccion("login")}
              >
                Iniciar Sesión
              </Boton>
              <Boton
                clase={`btn btn-morado ${
                  seccionActiva === "registro" ? "active" : ""
                }`}
                alHacerClick={() => alCambiarSeccion("registro")}
              >
                Registrarse
              </Boton>
            </div>
          ) : (
            <div className="d-inline-flex align-items-center">
              <span className="text-light me-2 small">
                Hola, <strong>{usuarioActual.nombre}</strong>
              </span>
              {esAdminOVendedor && (
                <button
                  type="button"
                  className={`btn btn-sm btn-outline-info me-2 fw-bold ${
                    seccionActiva === "admin" ? "active" : ""
                  }`}
                  onClick={() => alCambiarSeccion("admin")}
                >
                  Panel Admin
                </button>
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