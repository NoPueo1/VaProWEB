import { useNavigate } from "react-router-dom";
import type { ItemCarrito, Usuario } from "../services/storage";
import { formatoPesos } from "../services/validations";
import Boton from "./Boton";

interface Props {
  abierto: boolean;
  carrito: ItemCarrito[];
  usuarioActual: Usuario | null;
  alCerrar: () => void;
  alCambiarCantidad: (id: string, nuevaCantidad: number) => void;
  alEliminar: (id: string) => void;
  alVaciar: () => void;
  alIrLogin?: () => void;
  alIrProductos?: () => void;
}

function CarritoModal({
  abierto,
  carrito,
  usuarioActual,
  alCerrar,
  alCambiarCantidad,
  alEliminar,
  alVaciar,
  alIrLogin,
  alIrProductos,
}: Props) {
  const navigate = useNavigate();
  if (!abierto) return null;

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const manejarVaciar = () => {
    if (confirm("¿Deseas vaciar todos los productos del carrito?")) {
      alVaciar();
    }
  };

  const manejarComprar = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (usuarioActual) {
      alert(
        `¡Compra exitosa, ${usuarioActual.nombre}! Enviamos el recibo a ${usuarioActual.correo} y tus juegos ya están disponibles.`
      );
    } else {
      const deseaLogin = confirm(
        "¿Deseas iniciar sesión para asociar esta compra a tu cuenta?\n\n- Aceptar: Iniciar sesión\n- Cancelar: Comprar como invitado"
      );
      if (deseaLogin) {
        alCerrar();
        if (alIrLogin) {
          alIrLogin();
        } else {
          navigate("/login");
        }
        return;
      }
      alert("¡Compra exitosa! Gracias por tu compra en Vapro.");
    }

    alVaciar();
    alCerrar();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content modal-admin text-white">
          <div className="modal-header card-header-morado d-flex justify-content-between align-items-center">
            <h5 className="modal-title mb-0">Carrito de Compras</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={alCerrar}
              aria-label="Cerrar"
            />
          </div>
          <div className="modal-body p-4">
            {carrito.length === 0 ? (
              <div className="text-center py-5">
                <h4 className="text-white mb-3">Tu carrito está vacío</h4>
                <p className="text-light opacity-75 mb-4">
                  No tienes productos en el carrito actualmente.
                </p>
                <button
                  type="button"
                  className="btn btn-morado px-4 py-2"
                  onClick={() => {
                    alCerrar();
                    if (alIrProductos) {
                      alIrProductos();
                    } else {
                      navigate("/productos");
                    }
                  }}
                >
                  Ver Productos
                </button>
              </div>
            ) : (
              <div>
                <div className="table-responsive">
                  <table className="table table-admin align-middle mb-4">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center" style={{ width: "140px" }}>
                          Cantidad
                        </th>
                        <th className="text-end">Subtotal</th>
                        <th className="text-center" style={{ width: "80px" }}>
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="foto-juego-thumb me-3 rounded"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/Assets/logo.png";
                                }}
                              />
                              <span className="fw-bold">{item.nombre}</span>
                            </div>
                          </td>
                          <td className="text-center text-light">
                            {formatoPesos(item.precio)}
                          </td>
                          <td className="text-center">
                            <div
                              className="input-group input-group-sm justify-content-center"
                              style={{ maxWidth: "110px", margin: "0 auto" }}
                            >
                              <button
                                className="btn btn-outline-secondary text-white"
                                type="button"
                                onClick={() =>
                                  alCambiarCantidad(item.id, item.cantidad - 1)
                                }
                              >
                                -
                              </button>
                              <span className="input-group-text bg-dark text-white border-secondary px-3">
                                {item.cantidad}
                              </span>
                              <button
                                className="btn btn-outline-secondary text-white"
                                type="button"
                                onClick={() =>
                                  alCambiarCantidad(item.id, item.cantidad + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-end fw-bold text-warning">
                            {formatoPesos(item.precio * item.cantidad)}
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => alEliminar(item.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3 flex-wrap gap-3">
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={manejarVaciar}
                    >
                      Vaciar Carrito
                    </button>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <h4 className="mb-0 text-white">
                      Total:{" "}
                      <span className="text-warning fw-bold">
                        {formatoPesos(total)}
                      </span>
                    </h4>
                    <button
                      type="button"
                      className="btn btn-morado px-4 py-2"
                      onClick={manejarComprar}
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer border-secondary">
            <Boton clase="btn btn-outline-light px-3" alHacerClick={alCerrar}>
              Cerrar
            </Boton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarritoModal;