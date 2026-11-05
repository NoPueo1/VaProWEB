import { useState } from "react";
import type { FormEvent } from "react";
import Boton from "./Boton";

function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setNombre("");
    setCorreo("");
    setAsunto("");
    setMensaje("");
  };

  return (
    <main className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white">Contáctanos</h1>
        <p className="lead text-white-50">
          ¿Tienes dudas, problemas con un juego o propuestas de negocio? Escríbenos.
        </p>
      </div>

      <div className="row g-5">
        <div className="col-lg-5">
          <div className="card card-admin p-4 rounded-3 h-100">
            <h3 className="fw-bold text-white mb-4 border-bottom border-secondary pb-2">
              Información
            </h3>

            <ul className="list-unstyled text-light fs-5">
              <li className="mb-4">
                <strong>Ubicación:</strong>
                <br />
                <span className="text-white-50">
                  Sede Duoc UC, Concepción, Chile
                </span>
              </li>
              <li className="mb-4">
                <strong>Correo de Soporte:</strong>
                <br />
                <span className="text-white-50">ayuda@vapro.cl</span>
              </li>
            </ul>

            <div
              className="mt-5 p-3 rounded-2 border border-secondary border-opacity-25"
              style={{ backgroundColor: "#14111f" }}
            >
              <h5 className="text-white fw-bold">Horario de Atención:</h5>
              <p className="text-white-50 mb-0">
                Lunes a Viernes: 09:00 - 18:00 hrs.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card card-admin p-4 p-md-5 rounded-3">
            <h3 className="fw-bold text-white mb-4">Envíanos un mensaje</h3>

            {enviado && (
              <div className="alert alert-success alert-dismissible fade show mb-4">
                Mensaje enviado con éxito. Responderemos a la brevedad.
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEnviado(false)}
                />
              </div>
            )}

            <form onSubmit={manejarEnvio}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="contacto-nombre" className="form-label text-light">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contacto-nombre"
                    placeholder="Ej. Gordon Freeman"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="contacto-correo" className="form-label text-light">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="contacto-correo"
                    placeholder="tu@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="contacto-asunto" className="form-label text-light">
                  Motivo del contacto
                </label>
                <select
                  className="form-select"
                  id="contacto-asunto"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecciona una opción...
                  </option>
                  <option value="soporte">Soporte técnico o Reembolsos</option>
                  <option value="desarrollador">
                    Soy desarrollador (Quiero publicar un juego)
                  </option>
                  <option value="negocios">Propuesta de negocios</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="contacto-mensaje" className="form-label text-light">
                  Mensaje
                </label>
                <textarea
                  className="form-control"
                  id="contacto-mensaje"
                  rows={5}
                  placeholder="Detalla tu consulta aquí..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                />
              </div>

              <Boton
                tipo="submit"
                clase="btn btn-morado px-5 py-2 fw-bold"
              >
                Enviar Mensaje
              </Boton>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contacto;