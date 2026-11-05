import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import {
  getJuegos,
  saveJuego,
  deleteJuego,
  type Juego,
} from "../../services/storage";
import { formatoPesos } from "../../services/validations";
import Insignia from "../Insignia";

interface Props {
  alActualizarCatalogo: () => void;
}

function MantenedorJuegos({ alActualizarCatalogo }: Props) {
  const [juegos, setJuegos] = useState<Juego[]>(() => getJuegos());
  const [busqueda, setBusqueda] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [esEdicion, setEsEdicion] = useState(false);

  // Campos formulario
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Acción");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number | string>("");
  const [stock, setStock] = useState<number | string>(10);
  const [stockCritico, setStockCritico] = useState<number | string>(3);
  const [imagen, setImagen] = useState("/Assets/logo.png");
  const [imagenUrl, setImagenUrl] = useState("");

  const refrescar = () => {
    const actualizados = getJuegos();
    setJuegos(actualizados);
    alActualizarCatalogo();
  };

  const abrirModalNuevo = () => {
    setEsEdicion(false);
    setId("");
    setCodigo("");
    setNombre("");
    setCategoria("Acción");
    setDescripcion("");
    setPrecio("");
    setStock(10);
    setStockCritico(3);
    setImagen("/Assets/logo.png");
    setImagenUrl("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (juego: Juego) => {
    setEsEdicion(true);
    setId(juego.id);
    setCodigo(juego.codigo || juego.id);
    setNombre(juego.nombre);
    setCategoria(juego.categoria || "Acción");
    setDescripcion(juego.descripcion || "");
    setPrecio(juego.precio);
    setStock(juego.stock !== undefined ? juego.stock : 10);
    setStockCritico(juego.stockCritico !== undefined ? juego.stockCritico : 0);
    setImagen(juego.imagen || "/Assets/logo.png");
    setImagenUrl(juego.imagen || "");
    setModalAbierto(true);
  };

  const manejarArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagen(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const manejarGuardar = (e: FormEvent) => {
    e.preventDefault();

    const codigoTrim = codigo.trim().toUpperCase();
    const nombreTrim = nombre.trim();
    const precioNum = Number(precio);
    const stockNum = Number(stock);
    const stockCriticoNum = Number(stockCritico) || 0;

    if (!codigoTrim) {
      alert("Debes ingresar el código del juego.");
      return;
    }
    if (!nombreTrim) {
      alert("Debes ingresar el nombre del juego.");
      return;
    }
    if (isNaN(precioNum) || precioNum < 0) {
      alert("El precio debe ser un número válido mayor o igual a 0.");
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      alert("El stock debe ser un número mayor o igual a 0.");
      return;
    }

    const imagenFinal = imagenUrl.trim() || imagen || "/Assets/logo.png";

    const juegoAGuardar: Juego = {
      id: id || "JUEGO-" + (juegos.length + 1),
      codigo: codigoTrim,
      nombre: nombreTrim,
      descripcion: descripcion.trim(),
      precio: precioNum,
      stock: stockNum,
      stockCritico: stockCriticoNum,
      categoria: categoria || "Acción",
      imagen: imagenFinal,
      gameplay: imagenFinal,
      etiquetas: [categoria || "Acción"],
      enlace: `/Sitio-Juegos/${nombreTrim.replace(/\s+/g, "")}.html`,
    };

    saveJuego(juegoAGuardar);
    setModalAbierto(false);
    refrescar();
    alert("Juego guardado con éxito.");
  };

  const manejarEliminar = (juego: Juego) => {
    if (confirm(`¿Seguro que deseas eliminar "${juego.nombre}"?`)) {
      deleteJuego(juego.id);
      refrescar();
    }
  };

  const textoBusqueda = busqueda.toLowerCase().trim();
  const juegosFiltrados = juegos.filter(
    (j) =>
      j.nombre.toLowerCase().includes(textoBusqueda) ||
      (j.codigo && j.codigo.toLowerCase().includes(textoBusqueda))
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="fw-bold mb-0 text-white">Catálogo de Juegos</h3>
          <small className="text-white-50">
            {juegos.length} registrados
          </small>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-morado"
            onClick={abrirModalNuevo}
          >
            + Agregar Nuevo Juego
          </button>
        </div>
      </div>

      <div className="card card-admin mb-3 shadow-sm">
        <div className="card-body py-2 px-3">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-white border-secondary"
                placeholder="Buscar juego por nombre o código..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card card-admin shadow-sm mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-admin table-hover mb-0">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>Foto</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th className="text-end" style={{ width: "160px" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {juegosFiltrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-white-50 py-4"
                    >
                      No hay juegos en la lista.
                    </td>
                  </tr>
                ) : (
                  juegosFiltrados.map((j) => {
                    const esCritico =
                      j.stockCritico !== undefined &&
                      j.stock <= j.stockCritico;
                    return (
                      <tr key={j.id}>
                        <td style={{ width: "60px" }}>
                          <img
                            src={j.imagen}
                            alt={j.nombre}
                            className="foto-juego-thumb"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/Assets/logo.png";
                            }}
                          />
                        </td>
                        <td>
                          <code className="text-warning bg-black bg-opacity-50 px-2 py-1 rounded">
                            {j.codigo || j.id}
                          </code>
                        </td>
                        <td>
                          <strong className="text-white">{j.nombre}</strong>
                        </td>
                        <td>
                          <Insignia clase="badge bg-secondary">
                            {j.categoria || "General"}
                          </Insignia>
                        </td>
                        <td>
                          <span className="text-warning fw-bold">
                            {formatoPesos(j.precio)}
                          </span>
                        </td>
                        <td>
                          <span className="text-light">{j.stock}</span>
                          {esCritico && (
                            <Insignia clase="badge bg-danger ms-1">
                              Crítico
                            </Insignia>
                          )}
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-info me-1"
                            onClick={() => abrirModalEditar(j)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => manejarEliminar(j)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalAbierto && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content modal-admin text-white">
              <div className="modal-header card-header-morado d-flex justify-content-between align-items-center">
                <h5 className="modal-title mb-0">
                  {esEdicion ? "Editar Juego" : "Nuevo Juego"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalAbierto(false)}
                />
              </div>

              <form onSubmit={manejarGuardar}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Código del Juego:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Ej: CP2099"
                        maxLength={10}
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Nombre del Juego:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Ej: Cyberpunk 2099"
                        maxLength={100}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Categoría:
                      </label>
                      <select
                        className="form-select bg-dark text-white border-secondary"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                      >
                        <option value="Acción">Acción</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Horror">Horror</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Lucha">Lucha</option>
                        <option value="Casual">Casual</option>
                        <option value="Carreras">Carreras</option>
                        <option value="Estrategia">Estrategia</option>
                        <option value="Plataformas">Plataformas</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Precio ($ CLP):
                      </label>
                      <input
                        type="number"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="19990"
                        min="0"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Stock:
                      </label>
                      <input
                        type="number"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="10"
                        min="0"
                        step="1"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Stock Crítico:{" "}
                        <small className="text-white-50 fw-normal">
                          (Opcional)
                        </small>
                      </label>
                      <input
                        type="number"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="3"
                        min="0"
                        step="1"
                        value={stockCritico}
                        onChange={(e) => setStockCritico(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label text-light fw-bold">
                        Descripción:
                      </label>
                      <textarea
                        className="form-control bg-dark text-white border-secondary"
                        rows={3}
                        placeholder="Breve reseña del videojuego..."
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label text-light fw-bold">
                        Cargar Imagen:{" "}
                        <small className="text-white-50 fw-normal">
                          (Opcional)
                        </small>
                      </label>
                      <input
                        type="file"
                        className="form-control bg-dark text-white border-secondary"
                        accept="image/*"
                        onChange={manejarArchivo}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm mt-2 bg-dark text-white border-secondary"
                        placeholder="O pega el link de la imagen"
                        value={imagenUrl}
                        onChange={(e) => {
                          setImagenUrl(e.target.value);
                          setImagen(e.target.value);
                        }}
                      />
                      <div className="form-text text-white-50">
                        Si no cargas imagen, se asignará una por defecto.
                      </div>

                      {imagen && (
                        <div className="text-center mt-2">
                          <img
                            src={imagen}
                            alt="Vista previa"
                            className="foto-preview"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/Assets/logo.png";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-secondary">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalAbierto(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-morado">
                    Guardar Juego
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MantenedorJuegos;