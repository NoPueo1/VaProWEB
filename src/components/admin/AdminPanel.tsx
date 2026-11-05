import { useState, useEffect } from "react";
import type { Usuario } from "../../services/storage";
import MantenedorJuegos from "./MantenedorJuegos";
import MantenedorUsuarios from "./MantenedorUsuarios";

interface Props {
  usuarioActual: Usuario | null;
  alVolverTienda: () => void;
  alIrLogin: () => void;
  alCerrarSesion: () => void;
  alActualizarCatalogo: () => void;
}

function AdminPanel({
  usuarioActual,
  alVolverTienda,
  alIrLogin,
  alCerrarSesion,
  alActualizarCatalogo,
}: Props) {
  const [seccionAdmin, setSeccionAdmin] = useState<
    "inicio" | "juegos" | "usuarios"
  >("inicio");

  useEffect(() => {
    if (
      !usuarioActual ||
      (usuarioActual.rol !== "Administrador" &&
        usuarioActual.rol !== "Vendedor")
    ) {
      alert("Debes iniciar sesión como Administrador.");
      alIrLogin();
    }
  }, [usuarioActual, alIrLogin]);

  if (
    !usuarioActual ||
    (usuarioActual.rol !== "Administrador" && usuarioActual.rol !== "Vendedor")
  ) {
    return null;
  }

  const esVendedor = usuarioActual.rol === "Vendedor";

  const cambiarSeccion = (sec: "inicio" | "juegos" | "usuarios") => {
    if (sec === "usuarios" && esVendedor) {
      alert("Acceso denegado. Los vendedores solo pueden gestionar productos.");
      setSeccionAdmin("juegos");
      return;
    }
    setSeccionAdmin(sec);
  };

  return (
    <main className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2 className="text-white fw-bold mb-0">Panel de Administración</h2>
        <div>
          <button
            type="button"
            className="btn btn-outline-light me-2 btn-sm"
            onClick={alVolverTienda}
          >
            Volver a la Tienda
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={alCerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="row">
        <aside className="col-12 col-md-3 mb-4">
          <div className="card card-admin rounded-3">
            <div className="card-header card-header-morado fw-bold text-white">
              Menú Administración
            </div>
            <div className="list-group list-group-flush list-group-admin">
              <button
                type="button"
                className={`list-group-item list-group-item-action ${
                  seccionAdmin === "inicio" ? "active" : ""
                }`}
                onClick={() => cambiarSeccion("inicio")}
              >
                Inicio Panel
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action ${
                  seccionAdmin === "juegos" ? "active" : ""
                }`}
                onClick={() => cambiarSeccion("juegos")}
              >
                Mantenedor Juegos
              </button>
              {!esVendedor && (
                <button
                  type="button"
                  className={`list-group-item list-group-item-action ${
                    seccionAdmin === "usuarios" ? "active" : ""
                  }`}
                  onClick={() => cambiarSeccion("usuarios")}
                >
                  Mantenedor Usuarios
                </button>
              )}
              <button
                type="button"
                className="list-group-item list-group-item-action"
                onClick={alVolverTienda}
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        </aside>

        <div className="col-12 col-md-9">
          {seccionAdmin === "inicio" && (
            <>
              <div className="card card-admin p-4 p-md-5 rounded-3 mb-4">
                <h2 className="fw-bold text-white mb-2">
                  Panel de Administración
                </h2>
                <p className="lead text-white-50 mb-0">
                  Bienvenido al sistema de administración de Vapro. Desde aquí
                  puedes gestionar el catálogo de juegos y los usuarios
                  registrados en la plataforma.
                </p>
              </div>

              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <div className="card h-100 card-admin p-4 rounded-3">
                    <h4 className="fw-bold text-white mb-2">
                      Mantenedor de Juegos
                    </h4>
                    <p className="text-white-50 mb-4">
                      Administra los títulos en venta. Agrega nuevos lanzamientos
                      con su foto, descripción y precio, o actualiza y elimina
                      juegos del catálogo.
                    </p>
                    <div className="mt-auto">
                      <button
                        type="button"
                        className="btn btn-morado w-100 fw-bold py-2"
                        onClick={() => cambiarSeccion("juegos")}
                      >
                        Gestionar Juegos
                      </button>
                    </div>
                  </div>
                </div>

                {!esVendedor && (
                  <div className="col-12 col-md-6">
                    <div className="card h-100 card-admin p-4 rounded-3">
                      <h4 className="fw-bold text-white mb-2">
                        Mantenedor de Usuarios
                      </h4>
                      <p className="text-white-50 mb-4">
                        Administra las cuentas de usuario con validación de RUN
                        chileno, correos institucionales y comunas.
                      </p>
                      <div className="mt-auto">
                        <button
                          type="button"
                          className="btn btn-outline-light w-100 fw-bold py-2"
                          onClick={() => cambiarSeccion("usuarios")}
                        >
                          Gestionar Usuarios
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {seccionAdmin === "juegos" && (
            <MantenedorJuegos
              alActualizarCatalogo={alActualizarCatalogo}
            />
          )}

          {seccionAdmin === "usuarios" && !esVendedor && (
            <MantenedorUsuarios />
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminPanel;