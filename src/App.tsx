import { useState } from "react";
import Navbar from "./components/Navbar";
import Carrusel from "./components/Carrusel";
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
  const [seccionActiva, setSeccionActiva] = useState<string>("inicio");
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
    setSeccionActiva(destino);
  };

  const manejarCerrarSesion = () => {
    logoutUser();
    setUsuarioActual(null);
    setSeccionActiva("inicio");
  };

  const manejarIrAdmin = () => {
    if (
      usuarioActual &&
      (usuarioActual.rol === "Administrador" ||
        usuarioActual.rol === "Vendedor")
    ) {
      setSeccionActiva("admin");
    } else {
      alert("Debes iniciar sesión con una cuenta de Administrador o Vendedor.");
      setSeccionActiva("login");
    }
  };

  const totalUnidadesCarrito = cantidadTotalCarrito(carrito);
  const juegosDestacados = juegos.slice(0, 3);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        seccionActiva={seccionActiva}
        alCambiarSeccion={(sec) => {
          setSeccionActiva(sec);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cantidadCarrito={totalUnidadesCarrito}
        alAbrirCarrito={() => setCarritoAbierto(true)}
        usuarioActual={usuarioActual}
        alCerrarSesion={manejarCerrarSesion}
      />

      <main className="container my-4 flex-grow-1">
        {mensajeAlerta && (
          <Alerta tipo="success" alCerrar={() => setMensajeAlerta(null)}>
            {mensajeAlerta}
          </Alerta>
        )}

        {seccionActiva === "inicio" && (
          <>
            <Carrusel
              juegosDestacados={juegosDestacados}
              alSeleccionar={(j) => setJuegoSeleccionado(j)}
            />
            <Catalogo
              juegos={juegos}
              alComprar={(j) => agregarJuegoAlCarrito(j, 1)}
              alSeleccionar={(j) => setJuegoSeleccionado(j)}
            />
          </>
        )}

        {seccionActiva === "productos" && (
          <Catalogo
            juegos={juegos}
            alComprar={(j) => agregarJuegoAlCarrito(j, 1)}
            alSeleccionar={(j) => setJuegoSeleccionado(j)}
          />
        )}

        {seccionActiva === "nosotros" && <SobreNosotros />}

        {seccionActiva === "blog" && <Blog />}

        {seccionActiva === "contacto" && <Contacto />}

        {seccionActiva === "login" && (
          <Login
            alIniciarSesionExitoso={manejarIniciarSesionExitoso}
            alIrRegistro={() => setSeccionActiva("registro")}
          />
        )}

        {seccionActiva === "registro" && (
          <Registro
            alRegistroExitoso={() => setSeccionActiva("login")}
            alIrLogin={() => setSeccionActiva("login")}
            alVerTerminos={() => setSeccionActiva("terminos")}
          />
        )}

        {seccionActiva === "terminos" && (
          <TerminosCondiciones
            alVolver={() => setSeccionActiva("registro")}
          />
        )}

        {seccionActiva === "admin" && (
          <AdminPanel
            usuarioActual={usuarioActual}
            alVolverTienda={() => setSeccionActiva("inicio")}
            alIrLogin={() => setSeccionActiva("login")}
            alCerrarSesion={manejarCerrarSesion}
            alActualizarCatalogo={refrescarCatalogo}
          />
        )}
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
        alIrLogin={() => setSeccionActiva("login")}
        alIrProductos={() => setSeccionActiva("productos")}
      />

      <Footer
        alCambiarSeccion={(sec) => {
          setSeccionActiva(sec);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        alAbrirCarrito={() => setCarritoAbierto(true)}
        alIrAdmin={manejarIrAdmin}
      />
    </div>
  );
}

export default App;