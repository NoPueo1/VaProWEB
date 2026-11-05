import { useState } from "react";
import type { FormEvent } from "react";
import {
  validarRut,
  validarCorreo,
  validarPassword,
} from "../services/validations";
import { getUsuarios, saveUsuario } from "../services/storage";
import { REGIONES_CHILE } from "../data/chile-data";
import Boton from "./Boton";

interface Props {
  alRegistroExitoso: () => void;
  alIrLogin: () => void;
  alVerTerminos: () => void;
}

function Registro({ alRegistroExitoso, alIrLogin, alVerTerminos }: Props) {
  const [run, setRun] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [terminos, setTerminos] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const comunasDisponibles =
    REGIONES_CHILE.find((r) => r.id === region)?.comunas || [];

  const manejarSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const runLimpio = run.trim().toUpperCase();
    const emailTrim = email.trim();
    const nombreTrim = nombre.trim();
    const apellidoTrim = apellido.trim();
    const direccionTrim = direccion.trim();

    if (!terminos) {
      setError("Debes aceptar los Términos y Condiciones para registrarte.");
      return;
    }

    if (!validarRut(runLimpio)) {
      setError(
        "El RUN no es válido. Debe ser sin puntos ni guión (ej: 19011022K)."
      );
      return;
    }

    if (!validarCorreo(emailTrim)) {
      setError(
        "El correo debe ser institucional (@duoc.cl, @profesor.duoc.cl o @gmail.com)."
      );
      return;
    }

    if (!nombreTrim) {
      setError("Debes ingresar tu nombre.");
      return;
    }

    if (!apellidoTrim) {
      setError("Debes ingresar tus apellidos.");
      return;
    }

    if (!validarPassword(password)) {
      setError("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!region) {
      setError("Debes seleccionar una región.");
      return;
    }

    if (!comuna) {
      setError("Debes seleccionar una comuna.");
      return;
    }

    if (!direccionTrim) {
      setError("Debes ingresar tu dirección.");
      return;
    }

    const usuarios = getUsuarios();
    if (usuarios.some((u) => u.run.toUpperCase() === runLimpio)) {
      setError("Este RUN ya está registrado en el sistema.");
      return;
    }

    if (
      usuarios.some(
        (u) => u.correo.toLowerCase() === emailTrim.toLowerCase()
      )
    ) {
      setError("Ya existe una cuenta con este correo institucional.");
      return;
    }

    saveUsuario({
      run: runLimpio,
      nombre: nombreTrim,
      apellidos: apellidoTrim,
      correo: emailTrim,
      password,
      fechaNacimiento,
      telefono,
      rol: "Cliente",
      region,
      comuna,
      direccion: direccionTrim,
    });

    alert("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.");
    alRegistroExitoso();
  };

  return (
    <main
      className="container my-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="col-md-8 col-lg-6">
        <div className="card card-admin p-4 p-md-5 rounded-3">
          <div className="text-center mb-4">
            <img
              src="/Assets/logo.png"
              alt="Logo Vapro"
              width="80"
              className="logo-icono mb-3"
            />
            <h2 className="fw-bold text-white">Crear Cuenta</h2>
            <p className="text-white-50">
              Únete a la mejor comunidad gamer de Chile
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={manejarSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="regRun" className="form-label text-light">
                  RUN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regRun"
                  placeholder="19011022K"
                  maxLength={9}
                  value={run}
                  onChange={(e) => setRun(e.target.value)}
                  required
                />
                <small className="form-text text-white-50">
                  Sin puntos ni guión (7 a 9 caracteres)
                </small>
              </div>
              <div className="col-md-6">
                <label htmlFor="regEmail" className="form-label text-light">
                  Correo Institucional
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="regEmail"
                  placeholder="tu@correo.com"
                  maxLength={100}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <small className="form-text text-white-50">
                  @duoc.cl, @profesor.duoc.cl o @gmail.com
                </small>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="regNombre" className="form-label text-light">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regNombre"
                  placeholder="Gordon"
                  maxLength={50}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="regApellido" className="form-label text-light">
                  Apellidos
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regApellido"
                  placeholder="Freeman"
                  maxLength={100}
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="regPassword" className="form-label text-light">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="regPassword"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <small className="form-text text-white-50">
                  Entre 4 y 10 caracteres
                </small>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="regPasswordConfirm"
                  className="form-label text-light"
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="regPasswordConfirm"
                  placeholder="••••••••"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="regFecha" className="form-label text-light">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="regFecha"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="regTelefono" className="form-label text-light">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="regTelefono"
                  placeholder="+56 9 1234 5678"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="regRegion" className="form-label text-light">
                  Región
                </label>
                <select
                  className="form-select"
                  id="regRegion"
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
              <div className="col-md-6">
                <label htmlFor="regComuna" className="form-label text-light">
                  Comuna
                </label>
                <select
                  className="form-select"
                  id="regComuna"
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
            </div>

            <div className="mb-4">
              <label htmlFor="regDireccion" className="form-label text-light">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="regDireccion"
                placeholder="Av. Siempre Viva 742"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
                required
              />
              <label className="form-check-label text-light" htmlFor="terms">
                Acepto los{" "}
                <button
                  type="button"
                  className="btn btn-link text-primary text-decoration-none p-0 border-0 align-baseline"
                  onClick={alVerTerminos}
                >
                  Términos y Condiciones
                </button>
              </label>
            </div>

            <Boton
              tipo="submit"
              clase="btn btn-morado w-100 fw-bold mb-3 py-2"
            >
              Registrarse
            </Boton>

            <div className="text-center text-light">
              ¿Ya tienes una cuenta?{" "}
              <button
                type="button"
                className="btn btn-link text-primary text-decoration-none fw-bold p-0 border-0 align-baseline"
                onClick={alIrLogin}
              >
                Inicia sesión aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Registro;