import { useState } from "react";
// Para enrutamiento o navegacion a otras paginas
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import Catalogo from "./components/Catalogo";
import SobreNosotros from "./components/SobreNosotros";
import Contacto from "./components/Contacto";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Registro from "./components/Registro";
import TerminosCondiciones from "./components/TerminosCondiciones";
import AdminPanel from "./components/admin/AdminPanel";
import ModalDetalle from "./components/ModalDetalle";
import CarritoModal from "./components/CarritoModal";
import Alerta from "./components/Alerta";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import {
  cargarDatosIniciales,
  getJuegos,
  getCarrito,
  agregarAlCarrito,
  eliminarDelCarrito,
  cambiarCantidadCarrito,
  vaciarCarrito,
  cantidadTotalCarrito,
  getCurrentUser,
  logoutUser,
  type Juego,
  type ItemCarrito,
  type Usuario,
} from "./services/storage";

function App() {
  const navigate = useNavigate();

  // Definimos un state que guarde el nombre de la pagina actual
  const [paginaActual, setPaginaActual] = useState("Inicio");

  const [juegos, setJuegos] = useState<Juego[]>(() => {
    cargarDatosIniciales();
    return getJuegos();
  });
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => getCarrito());
  const [carritoAbierto, setCarritoAbierto] = useState<boolean>(false);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState<Juego | null>(null);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(() =>
    getCurrentUser()
  );
  const [mensajeAlerta, setMensajeAlerta] = useState<string | null>(null);

  const refrescarCatalogo = () => {
    setJuegos(getJuegos());
  };

  const agregarJuegoAlCarrito = (juego: Juego, cantidad: number = 1) => {
    const nuevoCarrito = agregarAlCarrito(juego, cantidad);
    setCarrito([...nuevoCarrito]);
    setMensajeAlerta(
      `${juego.nombre} (x${cantidad}) se agregó al carrito con éxito.`
    );
    setTimeout(() => setMensajeAlerta(null), 3500);
  };

  const eliminarJuegoDelCarrito = (id: string) => {
    const nuevoCarrito = eliminarDelCarrito(id);
    setCarrito([...nuevoCarrito]);
  };

  const cambiarCantidad = (id: string, cantidad: number) => {
    const nuevoCarrito = cambiarCantidadCarrito(id, cantidad);
    setCarrito([...nuevoCarrito]);
  };

  const vaciarElCarrito = () => {
    vaciarCarrito();
    setCarrito([]);
  };

  const manejarIniciarSesionExitoso = (usuario: Usuario, destino: string) => {
    setUsuarioActual(usuario);
    setPaginaActual(destino === "/admin" ? "Admin" : "Inicio");
    navigate(destino);
  };

  const manejarCerrarSesion = () => {
    logoutUser();
    setUsuarioActual(null);
    setPaginaActual("Inicio");
    navigate("/");
  };

  const totalUnidadesCarrito = cantidadTotalCarrito(carrito);
  const juegosDestacados = juegos.slice(0, 3);

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />

      {/* ============== NAV BAR ============== */}
      <Navbar
        paginaActual={paginaActual}
        alCambiarPagina={setPaginaActual}
        cantidadCarrito={totalUnidadesCarrito}
        alAbrirCarrito={() => setCarritoAbierto(true)}
        usuarioActual={usuarioActual}
        alCerrarSesion={manejarCerrarSesion}
      />
      {/* ===================================== */}

      {/* ============== MAIN ============== */}
      <main className="container my-4 flex-grow-1">
        {mensajeAlerta && (
          <Alerta tipo="success" alCerrar={() => setMensajeAlerta(null)}>
            {mensajeAlerta}
          </Alerta>
        )}

        {/* Estas son las rutas de navegacion dentro del sitio */}
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                juegos={juegos}
                juegosDestacados={juegosDestacados}
                alComprar={(j) => agregarJuegoAlCarrito(j, 1)}
                alSeleccionar={(j) => setJuegoSeleccionado(j)}
              />
            }
          />
          <Route
            path="/productos"
            element={
              <Catalogo
                juegos={juegos}
                alComprar={(j) => agregarJuegoAlCarrito(j, 1)}
                alSeleccionar={(j) => setJuegoSeleccionado(j)}
              />
            }
          />
          <Route path="/nosotros" element={<SobreNosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/login"
            element={
              <Login
                alIniciarSesionExitoso={manejarIniciarSesionExitoso}
              />
            }
          />
          <Route
            path="/registro"
            element={
              <Registro />
            }
          />
          <Route path="/terminos" element={<TerminosCondiciones />} />
          <Route
            path="/admin"
            element={
              <AdminPanel
                usuarioActual={usuarioActual}
                alVolverTienda={() => {
                  setPaginaActual("Inicio");
                  navigate("/");
                }}
                alIrLogin={() => {
                  setPaginaActual("Login");
                  navigate("/login");
                }}
                alCerrarSesion={manejarCerrarSesion}
                alActualizarCatalogo={refrescarCatalogo}
              />
            }
          />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>

      {juegoSeleccionado && (
        <ModalDetalle
          key={juegoSeleccionado.id}
          juego={juegoSeleccionado}
          alCerrar={() => setJuegoSeleccionado(null)}
          alComprar={(j, cant) => agregarJuegoAlCarrito(j, cant)}
          alIrCarrito={() => setCarritoAbierto(true)}
        />
      )}

      <CarritoModal
        abierto={carritoAbierto}
        carrito={carrito}
        usuarioActual={usuarioActual}
        alCerrar={() => setCarritoAbierto(false)}
        alCambiarCantidad={cambiarCantidad}
        alEliminar={eliminarJuegoDelCarrito}
        alVaciar={vaciarElCarrito}
      />

      {/* ============== FOOTER ============== */}
      <Footer
        alCambiarPagina={setPaginaActual}
        alAbrirCarrito={() => setCarritoAbierto(true)}
      />
      {/* ===================================== */}
    </div>
  );
}

export default App;
