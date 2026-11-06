import { Link } from "react-router-dom";
import { PAGINAS } from "../data/Paginas";

interface Props {
  alCambiarPagina?: (nuevaPagina: string) => void;
  alAbrirCarrito?: () => void;
}

function Footer({ alCambiarPagina, alAbrirCarrito }: Props) {
  return (
    <footer className="py-5 mt-auto">
      <div className="container">
        <div className="row g-4 justify-content-between">
          <div className="col-12 col-md-6 col-lg-5">
            <Link
              to="/"
              className="d-flex align-items-center mb-3 text-decoration-none brand-container"
              onClick={() => alCambiarPagina && alCambiarPagina("Inicio")}
            >
              <img
                src="/Assets/logo.png"
                alt="Logo Vapro"
                className="footer-logo-img me-2"
              />
              <img
                src="/Assets/logo-letras.png"
                alt="VaPro"
                className="footer-text-img"
              />
            </Link>
            <p className="text-light mb-2">
              &copy; 2026 Provoste-Vasquez Corporation. Todos los derechos reservados.
            </p>
            <p className="text-white-50 small mb-0">
              Todos los juegos en venta siguen las normativas de venta vigentes en la legislación chilena.
            </p>
          </div>

          <div className="col-12 col-md-5 col-lg-4">
            <h5 className="text-white">Enlaces del Sitio</h5>
            <ul className="nav flex-column">
              {/* Recorremos las páginas del sitio */}
              {PAGINAS.map((pag) => (
                <li key={pag.ruta} className="nav-item mb-2">
                  <Link
                    to={pag.ruta}
                    className="nav-link p-0 text-light bg-transparent border-0 text-start"
                    onClick={() => alCambiarPagina && alCambiarPagina(pag.nombreCorto)}
                  >
                    {pag.nombre}
                  </Link>
                </li>
              ))}
              <li className="nav-item mb-2">
                <button
                  type="button"
                  className="nav-link p-0 text-light bg-transparent border-0 text-start"
                  onClick={alAbrirCarrito}
                >
                  Carrito de Compras
                </button>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/admin"
                  className="nav-link p-0 text-light fw-bold bg-transparent border-0 text-start"
                  onClick={() => alCambiarPagina && alCambiarPagina("Admin")}
                >
                  Panel Administrador
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
