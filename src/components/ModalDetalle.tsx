import { useState } from "react";
import type { Juego } from "../services/storage";
import { formatoPesos } from "../services/validations";
import Boton from "./Boton";
import Insignia from "./Insignia";

interface Props {
  juego: Juego | null;
  alCerrar: () => void;
  alComprar: (juego: Juego, cantidad: number) => void;
  alIrCarrito?: () => void;
}

function ModalDetalle({ juego, alCerrar, alComprar, alIrCarrito }: Props) {
  const [imagenActiva, setImagenActiva] = useState<string>(
    juego ? juego.imagen : ""
  );
  const [cantidad, setCantidad] = useState<number>(1);
  const [agregado, setAgregado] = useState(false);

  if (!juego) return null;

  const miniaturas = [juego.imagen, juego.gameplay].filter(Boolean);

  const manejarAgregar = () => {
    alComprar(juego, cantidad);
    setAgregado(true);
    setTimeout(() => {
      setAgregado(false);
    }, 4000);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content modal-admin text-white">
          <div className="modal-header card-header-morado d-flex justify-content-between align-items-center">
            <h5 className="modal-title mb-0">{juego.nombre}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={alCerrar}
              aria-label="Cerrar"
            />
          </div>
          <div className="modal-body p-4">
            <div className="row g-4 mb-4">
              {/* Galeria de capturas */}
              <div className="col-lg-7">
                <div className="card card-admin p-2 shadow-lg mb-3">
                  <img
                    src={imagenActiva || juego.imagen}
                    alt={juego.nombre}
                    className="img-fluid rounded-3 w-100 shadow visor-galeria-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/Assets/logo.png";
                    }}
                  />
                </div>
                <div className="d-flex gap-2">
                  {miniaturas.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Miniatura ${idx + 1}`}
                      className={`img-thumbnail bg-dark border-secondary miniatura-galeria ${
                        imagenActiva === src ? "border-primary" : ""
                      }`}
                      onClick={() => setImagenActiva(src)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/Assets/logo.png";
                      }}
                    />
                  ))}
                </div>
                <small className="text-white-50 d-block mt-2">
                  Haz clic en una miniatura para cambiar la vista previa.
                </small>
              </div>

              {/* Informacion de compra */}
              <div className="col-lg-5">
                <div className="card card-admin p-4 rounded-3 h-100 d-flex flex-column">
                  <div className="mb-2">
                    {juego.etiquetas.map((tag) => (
                      <Insignia key={tag} clase="badge bg-secondary me-1">
                        {tag}
                      </Insignia>
                    ))}
                  </div>

                  <h2 className="fw-bold text-white mb-2">{juego.nombre}</h2>
                  <p className="text-light fs-6 mb-3" style={{ lineHeight: "1.6" }}>
                    {juego.descripcion}
                  </p>

                  <ul className="list-unstyled text-white-50 small mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                    <li>
                      <strong>Código:</strong> {juego.codigo || juego.id}
                    </li>
                    <li>
                      <strong>Categoría:</strong> {juego.categoria}
                    </li>
                    <li>
                      <strong>Stock disponible:</strong> {juego.stock} unidades
                    </li>
                    <li>
                      <strong>Desarrollador:</strong> VaPro Studios
                    </li>
                    <li>
                      <strong>Distribuidor:</strong> VaPro Corporation
                    </li>
                    <li>
                      <strong>Año:</strong> 2026
                    </li>
                  </ul>

                  <div
                    className="mt-auto p-3 rounded-2 border border-secondary border-opacity-25"
                    style={{ backgroundColor: "#14111f" }}
                  >
                    <h3 className="fw-bold text-warning mb-3">
                      {formatoPesos(juego.precio)}
                    </h3>

                    <div className="d-flex align-items-center mb-3">
                      <label
                        htmlFor="modal-cantidad"
                        className="form-label text-white-50 small mb-0 me-3"
                      >
                        Copias:
                      </label>
                      <input
                        type="number"
                        id="modal-cantidad"
                        className="form-control text-center fw-bold bg-dark text-white border-secondary"
                        value={cantidad}
                        min={1}
                        max={10}
                        style={{ width: "80px" }}
                        onChange={(e) =>
                          setCantidad(
                            Math.max(1, Math.min(10, Number(e.target.value) || 1))
                          )
                        }
                      />
                    </div>

                    <Boton
                      tipo="button"
                      clase="btn btn-morado w-100 fw-bold py-2"
                      alHacerClick={manejarAgregar}
                    >
                      Añadir al carrito
                    </Boton>

                    {agregado && (
                      <div className="alert alert-success mt-3 py-2 small" role="alert">
                        Juego añadido al carrito.{" "}
                        {alIrCarrito && (
                          <button
                            type="button"
                            className="btn btn-link alert-link text-white fw-bold p-0 border-0 align-baseline"
                            onClick={() => {
                              alCerrar();
                              alIrCarrito();
                            }}
                          >
                            Ir al Carrito
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Ficha tecnica */}
            <div className="card card-admin p-4 shadow-sm">
              <h5 className="fw-bold text-white mb-2 border-bottom border-secondary pb-2">
                Acerca del Juego
              </h5>
              <p className="text-light mb-0 small" style={{ lineHeight: "1.8" }}>
                Disfruta de este título disponible en VaPro Store con soporte para
                guardado en la nube, logros y compatibilidad completa con mandos y
                teclado. Desarrollado y optimizado bajo los estándares de Provoste-Vasquez Corporation.
              </p>
            </div>
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

export default ModalDetalle;