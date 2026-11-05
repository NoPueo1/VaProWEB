interface Props {
  alCambiarSeccion: (seccion: string) => void;
  alAbrirCarrito: () => void;
  alIrAdmin: () => void;
}

function Footer({ alCambiarSeccion, alAbrirCarrito, alIrAdmin }: Props) {
  return (
    <footer className="py-5 mt-auto">
      <div className="container">
        <div className="row g-4 justify-content-between">
          <div className="col-12 col-md-6 col-lg-5">
            <div
              role="button"
              tabIndex={0}
              className="d-flex align-items-center mb-3 text-decoration-none brand-container"
              onClick={() => alCambiarSeccion("inicio")}
              style={{ cursor: "pointer" }}
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
            </div>
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
              <li className="nav-item mb-2">
                <button
                  type="button"
                  className="nav-link p-0 text-light bg-transparent border-0 text-start"
                  onClick={() => alCambiarSeccion("inicio")}
                >
                  Página Principal
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  type="button"
                  className="nav-link p-0 text-light bg-transparent border-0 text-start"
                  onClick={() => alCambiarSeccion("nosotros")}
                >
                  Sobre Nosotros
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  type="button"
                  className="nav-link p-0 text-light bg-transparent border-0 text-start"
                  onClick={() => alCambiarSeccion("blog")}
                >
                  Blog
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  type="button"
                  className="nav-link p-0 text-light bg-transparent border-0 text-start"
                  onClick={() => alCambiarSeccion("contacto")}
                >
                  Contacto
                </button>
              </li>
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
                <button
                  type="button"
                  className="nav-link p-0 text-light fw-bold bg-transparent border-0 text-start"
                  onClick={alIrAdmin}
                >
                  Panel Administrador
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;