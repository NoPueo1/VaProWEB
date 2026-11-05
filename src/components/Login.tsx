import { useState } from "react";
import type { FormEvent } from "react";
import { validarCorreo, validarPassword } from "../services/validations";
import { getUsuarios, setCurrentUser, type Usuario } from "../services/storage";
import Boton from "./Boton";

interface Props {
  alIniciarSesionExitoso: (usuario: Usuario, destino: string) => void;
  alIrRegistro: () => void;
}

function Login({ alIniciarSesionExitoso, alIrRegistro }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manejarSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrim = email.trim();
    const passTrim = password.trim();

    if (!validarCorreo(emailTrim)) {
      setError(
        "El correo debe ser institucional (@duoc.cl, @profesor.duoc.cl o @gmail.com)."
      );
      return;
    }

    if (!validarPassword(passTrim)) {
      setError("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    const lista = getUsuarios();
    const u = lista.find(
      (x) => x.correo.toLowerCase() === emailTrim.toLowerCase()
    );

    if (u && (u.rol === "Administrador" || u.rol === "Vendedor")) {
      setCurrentUser(u);
      alert("Bienvenido al panel, " + u.nombre);
      alIniciarSesionExitoso(u, "admin");
    } else {
      const usuarioCliente: Usuario = u || {
        run: "CLI-" + Date.now(),
        nombre: emailTrim.split("@")[0],
        apellidos: "",
        correo: emailTrim,
        rol: "Cliente",
        region: "RM",
        comuna: "Santiago",
        direccion: "Sin dirección",
      };
      setCurrentUser(usuarioCliente);
      alert("¡Bienvenido a Vapro!");
      alIniciarSesionExitoso(usuarioCliente, "inicio");
    }
  };

  return (
    <main
      className="container my-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="col-md-6 col-lg-5">
        <div className="card card-admin p-4 p-md-5 rounded-3">
          <div className="text-center mb-4">
            <img
              src="/Assets/logo.png"
              alt="Logo Vapro"
              width="80"
              className="logo-icono mb-3"
            />
            <h2 className="fw-bold text-white">Iniciar Sesión</h2>
            <p className="text-white-50">Ingresa tus datos para acceder</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={manejarSubmit}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label text-light">
                Correo Institucional
              </label>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="ejemplo@duoc.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="loginPassword" className="form-label text-light">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={recordarme}
                  onChange={(e) => setRecordarme(e.target.checked)}
                />
                <label className="form-check-label text-light" htmlFor="rememberMe">
                  Recordarme
                </label>
              </div>
            </div>

            <Boton
              tipo="submit"
              clase="btn btn-morado w-100 fw-bold mb-3 py-2"
            >
              Ingresar
            </Boton>

            <div className="text-center text-light mb-3">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                className="btn btn-link text-primary text-decoration-none fw-bold p-0 border-0 align-baseline"
                onClick={alIrRegistro}
              >
                Regístrate aquí
              </button>
            </div>

            <div
              className="p-3 rounded-2 border border-secondary border-opacity-25 text-center"
              style={{ backgroundColor: "#14111f" }}
            >
              <small className="text-white-50 d-block mb-1">
                Credenciales de prueba:
              </small>
              <span className="badge bg-secondary me-1">
                Admin: admin@duoc.cl
              </span>
              <span className="badge bg-secondary me-1">
                Vendedor: carlos.vargas@profesor.duoc.cl
              </span>
              <span className="badge bg-secondary">Clave: 1234</span>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;