import { useState } from "react";
import type { FormEvent } from "react";
import {
  getUsuarios,
  saveUsuario,
  deleteUsuario,
  type Usuario,
} from "../../services/storage";
import {
  validarRut,
  validarCorreo,
} from "../../services/validations";
import { REGIONES_CHILE } from "../../data/chile-data";
import Insignia from "../Insignia";

function MantenedorUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => getUsuarios());
  const [busqueda, setBusqueda] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [esEdicion, setEsEdicion] = useState(false);

  // Campos formulario
  const [run, setRun] = useState("");
  const [rol, setRol] = useState("Cliente");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha, setFecha] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");

  const refrescar = () => {
    setUsuarios(getUsuarios());
  };

  const comunasDisponibles =
    REGIONES_CHILE.find((r) => r.id === region)?.comunas || [];

  const abrirModalNuevo = () => {
    setEsEdicion(false);
    setRun("");
    setRol("Cliente");
    setNombre("");
    setApellidos("");
    setCorreo("");
    setFecha("");
    setRegion("");
    setComuna("");
    setDireccion("");
    setModalAbierto(true);
  };

  const abrirModalEditar = (u: Usuario) => {
    setEsEdicion(true);
    setRun(u.run);
    setRol(u.rol || "Cliente");
    setNombre(u.nombre);
    setApellidos(u.apellidos);
    setCorreo(u.correo);
    setFecha(u.fechaNacimiento || "");
    setRegion(u.region || "");
    setComuna(u.comuna || "");
    setDireccion(u.direccion || "");
    setModalAbierto(true);
  };

  const manejarGuardar = (e: FormEvent) => {
    e.preventDefault();

    const runLimpio = run.trim().toUpperCase();
    const nombreTrim = nombre.trim();
    const apellidosTrim = apellidos.trim();
    const correoTrim = correo.trim();
    const direccionTrim = direccion.trim();

    if (!esEdicion) {
      if (!validarRut(runLimpio)) {
        alert(
          "El RUN no es válido. Debe ser sin puntos ni guión (ej: 19011022K)."
        );
        return;
      }
      if (usuarios.some((u) => u.run.toUpperCase() === runLimpio)) {
        alert("Este RUN ya está registrado.");
        return;
      }
    }

    if (!rol) {
      alert("Debes seleccionar un rol.");
      return;
    }
    if (!nombreTrim) {
      alert("Debes ingresar el nombre.");
      return;
    }
    if (!apellidosTrim) {
      alert("Debes ingresar los apellidos.");
      return;
    }
    if (!validarCorreo(correoTrim)) {
      alert(
        "El correo debe ser institucional (@duoc.cl, @profesor.duoc.cl o @gmail.com)."
      );
      return;
    }
    if (!region) {
      alert("Debes seleccionar una región.");
      return;
    }
    if (!comuna) {
      alert("Debes seleccionar una comuna.");
      return;
    }
    if (!direccionTrim) {
      alert("Debes ingresar una dirección.");
      return;
    }

    saveUsuario({
      run: runLimpio,
      nombre: nombreTrim,
      apellidos: apellidosTrim,
      correo: correoTrim,
      fechaNacimiento: fecha,
      rol,
      region,
      comuna,
      direccion: direccionTrim,
    });

    setModalAbierto(false);
    refrescar();
    alert("Usuario guardado con éxito.");
  };

  const manejarEliminar = (u: Usuario) => {
    if (
      confirm(
        `¿Seguro que deseas eliminar al usuario ${u.nombre} ${u.apellidos}?`
      )
    ) {
      deleteUsuario(u.run);
      refrescar();
    }
  };

  const textoBusqueda = busqueda.toLowerCase().trim();
  const usuariosFiltrados = usuarios.filter((u) => {
    const runMatch = u.run && u.run.toLowerCase().includes(textoBusqueda);
    const nombreMatch =
      u.nombre && u.nombre.toLowerCase().includes(textoBusqueda);
    const apellidoMatch =
      u.apellidos && u.apellidos.toLowerCase().includes(textoBusqueda);
    const correoMatch =
      u.correo && u.correo.toLowerCase().includes(textoBusqueda);
    return runMatch || nombreMatch || apellidoMatch || correoMatch;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="fw-bold mb-0 text-white">Gestión de Usuarios</h3>
          <small className="text-white-50">
            {usuarios.length} registrados
          </small>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-morado"
            onClick={abrirModalNuevo}
          >
            + Nuevo Usuario
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
                placeholder="Buscar por RUN, nombre, apellido o correo..."
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
                  <th>RUN</th>
                  <th>Nombre y Apellidos</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Comuna</th>
                  <th className="text-end" style={{ width: "170px" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center text-white-50 py-4"
                    >
                      No se encontraron usuarios.
                    </td>
                  </tr>
                ) : (
                  usuariosFiltrados.map((u) => {
                    let rolBadge = "badge bg-secondary";
                    if (u.rol === "Administrador")
                      rolBadge = "badge bg-danger";
                    else if (u.rol === "Vendedor")
                      rolBadge = "badge bg-info text-dark";

                    return (
                      <tr key={u.run}>
                        <td>
                          <code className="text-warning bg-black bg-opacity-50 px-2 py-1 rounded">
                            {u.run}
                          </code>
                        </td>
                        <td>
                          <strong className="text-white">
                            {u.nombre} {u.apellidos}
                          </strong>
                          <br />
                          <small className="text-white-50">
                            {u.direccion || ""}
                          </small>
                        </td>
                        <td className="text-light">{u.correo}</td>
                        <td>
                          <Insignia clase={rolBadge}>{u.rol}</Insignia>
                        </td>
                        <td>{u.comuna || "N/A"}</td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-info me-1"
                            onClick={() => abrirModalEditar(u)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => manejarEliminar(u)}
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
                  {esEdicion ? "Editar Usuario" : "Nuevo Usuario"}
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
                        RUN:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Ej: 19011022K"
                        maxLength={9}
                        value={run}
                        onChange={(e) => setRun(e.target.value)}
                        disabled={esEdicion}
                        required
                      />
                      <small className="form-text text-light opacity-75">
                        Sin puntos ni guión (7 a 9 caracteres).
                      </small>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Rol:
                      </label>
                      <select
                        className="form-select bg-dark text-white border-secondary"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                      >
                        <option value="Administrador">Administrador</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Cliente">Cliente</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Nombre:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Ej: Carlos"
                        maxLength={50}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Apellidos:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Ej: Pérez González"
                        maxLength={100}
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Correo Institucional:
                      </label>
                      <input
                        type="email"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="usuario@duoc.cl"
                        maxLength={100}
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                      />
                      <small className="form-text text-light opacity-75">
                        Permitidos: @duoc.cl, @profesor.duoc.cl o @gmail.com
                      </small>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Fecha de Nacimiento:
                      </label>
                      <input
                        type="date"
                        className="form-control bg-dark text-white border-secondary"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Región:
                      </label>
                      <select
                        className="form-select bg-dark text-white border-secondary"
                        value={region}
                        onChange={(e) => {
                          setRegion(e.target.value);
                          setComuna("");
                        }}
                        required
                      >
                        <option value="">Selecciona una región...</option>
                        {REGIONES_CHILE.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label text-light fw-bold">
                        Comuna:
                      </label>
                      <select
                        className="form-select bg-dark text-white border-secondary"
                        value={comuna}
                        onChange={(e) => setComuna(e.target.value)}
                        disabled={!region}
                        required
                      >
                        <option value="">
                          {region
                            ? "Selecciona una comuna..."
                            : "Primero selecciona una región"}
                        </option>
                        {comunasDisponibles.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label text-light fw-bold">
                        Dirección:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Av. Providencia 1200"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                      />
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
                    Guardar Usuario
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

export default MantenedorUsuarios;