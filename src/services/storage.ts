export interface Juego {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockCritico: number;
  categoria: string;
  imagen: string;
  gameplay: string;
  etiquetas: string[];
  enlace: string;
}

export interface Usuario {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password?: string;
  fechaNacimiento?: string;
  rol: "Administrador" | "Vendedor" | "Cliente" | string;
  region: string;
  comuna: string;
  direccion: string;
  telefono?: string;
}

export interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

// catalogo inicial de videojuegos precargados en la tienda
export const juegosPorDefecto: Juego[] = [
  {
    id: "JUEGO-1",
    codigo: "CP2099",
    nombre: "Cyberpunk 2099",
    descripcion: "Entra en el distopico mundo de Cyberpunk 2099.",
    precio: 29990,
    stock: 20,
    stockCritico: 5,
    categoria: "Acción",
    imagen: "/Assets/juegos/cyberpunk2099.png",
    gameplay: "/Assets/juegos/galeria/cyberpunk2099-gameplay.jpg",
    etiquetas: ["Acción", "RPG"],
    enlace: "/Sitio-Juegos/Cyberpunk2099.html",
  },
  {
    id: "JUEGO-2",
    codigo: "PC2000",
    nombre: "Pickcraft 2",
    descripcion: "Mas bloques que nunca, la aventura te espera.",
    precio: 14990,
    stock: 15,
    stockCritico: 3,
    categoria: "Aventura",
    imagen: "/Assets/juegos/pickcraft2.png",
    gameplay: "/Assets/juegos/galeria/pickcraft2-gameplay.jpg",
    etiquetas: ["Aventura", "Indie"],
    enlace: "/Sitio-Juegos/Pickcraft2.html",
  },
  {
    id: "JUEGO-3",
    codigo: "RG4000",
    nombre: "Resident Good 4",
    descripcion: "Leon nunca fue tan feliz como en Resident Good 4.",
    precio: 39990,
    stock: 10,
    stockCritico: 4,
    categoria: "Horror",
    imagen: "/Assets/juegos/residentgood4.png",
    gameplay: "/Assets/juegos/galeria/residentgood4-gameplay.jpg",
    etiquetas: ["Horror", "Supervivencia"],
    enlace: "/Sitio-Juegos/ResidentGood4.html",
  },
  {
    id: "JUEGO-4",
    codigo: "F3000",
    nombre: "Fifa 3000",
    descripcion: "El simulador de futbol definitivo de Provoste-Vasquez.",
    precio: 59990,
    stock: 30,
    stockCritico: 5,
    categoria: "Deportes",
    imagen: "/Assets/juegos/fifa3000.png",
    gameplay: "/Assets/juegos/galeria/fifa3000-gameplay.jpg",
    etiquetas: ["Deportes"],
    enlace: "/Sitio-Juegos/Fifa3000.html",
  },
  {
    id: "JUEGO-5",
    codigo: "OF6000",
    nombre: "Office Fighter 6",
    descripcion: "El torneo de lucha definitivo entre colegas de oficina.",
    precio: 59990,
    stock: 12,
    stockCritico: 3,
    categoria: "Lucha",
    imagen: "/Assets/juegos/officefighter6.png",
    gameplay: "/Assets/juegos/galeria/officefighter6-gameplay.jpg",
    etiquetas: ["Lucha"],
    enlace: "/Sitio-Juegos/OfficeFighter6.html",
  },
  {
    id: "JUEGO-6",
    codigo: "MS2000",
    nombre: "Mariana Sisters 2",
    descripcion: "Aventura de plataformas y saltos de Mariana y sus hermanas.",
    precio: 9990,
    stock: 8,
    stockCritico: 2,
    categoria: "Casual",
    imagen: "/Assets/juegos/marianasisters2.png",
    gameplay: "/Assets/juegos/galeria/marianasisters2-gameplay.jpg",
    etiquetas: ["Casual"],
    enlace: "/Sitio-Juegos/MarianaSisters2.html",
  },
  {
    id: "JUEGO-7",
    codigo: "TUNELS",
    nombre: "Tunels",
    descripcion:
      "Explora laberintos subterraneos y supera desafiantes niveles de plataformas.",
    precio: 29990,
    stock: 14,
    stockCritico: 3,
    categoria: "Aventura",
    imagen: "/Assets/juegos/tunels.png",
    gameplay: "/Assets/juegos/galeria/tunels-gameplay.jpg",
    etiquetas: ["Plataformas"],
    enlace: "/Sitio-Juegos/Tunels.html",
  },
  {
    id: "JUEGO-8",
    codigo: "L4L200",
    nombre: "Left 4 Live 2",
    descripcion:
      "Juego cooperativo para sobrevivir a hordas de personas comunes.",
    precio: 7990,
    stock: 25,
    stockCritico: 5,
    categoria: "Acción",
    imagen: "/Assets/juegos/left4live2.png",
    gameplay: "/Assets/juegos/galeria/left4live2-gameplay.jpg",
    etiquetas: ["Acción", "Cooperativo"],
    enlace: "/Sitio-Juegos/Left4Live2.html",
  },
  {
    id: "JUEGO-9",
    codigo: "AOK200",
    nombre: "Age of Kingdom 2",
    descripcion:
      "Estrategia en tiempo real con batallas de castillos medievales.",
    precio: 14990,
    stock: 22,
    stockCritico: 5,
    categoria: "Estrategia",
    imagen: "/Assets/juegos/ageofkingdom2.png",
    gameplay: "/Assets/juegos/galeria/ageofkingdom2-gameplay.jpg",
    etiquetas: ["Estrategia"],
    enlace: "/Sitio-Juegos/AgeOfKingdom2.html",
  },
];

// cuentas iniciales para pruebas del sistema
export const usuariosPorDefecto: Usuario[] = [
  {
    run: "111111111",
    nombre: "Administrador",
    apellidos: "Principal",
    correo: "admin@duoc.cl",
    password: "1234",
    fechaNacimiento: "1995-05-15",
    rol: "Administrador",
    region: "RM",
    comuna: "Santiago",
    direccion: "Av. España 8",
  },
  {
    run: "222222222",
    nombre: "Carlos",
    apellidos: "Vargas",
    correo: "carlos.vargas@profesor.duoc.cl",
    password: "1234",
    fechaNacimiento: "1997-08-20",
    rol: "Vendedor",
    region: "RM",
    comuna: "Providencia",
    direccion: "Av. Providencia 1200",
  },
  {
    run: "19011022K",
    nombre: "Matias",
    apellidos: "Perez",
    correo: "matias.perez@gmail.com",
    password: "1234",
    fechaNacimiento: "2001-11-03",
    rol: "Cliente",
    region: "VA",
    comuna: "Viña del Mar",
    direccion: "Calle Valparaíso 320",
  },
];

// si no hay datos guardados en el localstorage cargamos los valores por defecto
export function cargarDatosIniciales(): void {
  if (typeof window === "undefined") return;

  const guardados = localStorage.getItem("lista_juegos");
  if (!guardados || !guardados.includes("Left4Live2")) {
    localStorage.setItem("lista_juegos", JSON.stringify(juegosPorDefecto));
  }

  if (!localStorage.getItem("lista_usuarios")) {
    localStorage.setItem("lista_usuarios", JSON.stringify(usuariosPorDefecto));
  }
}

// lee los juegos guardados en el localstorage
export function getJuegos(): Juego[] {
  cargarDatosIniciales();
  const datos = localStorage.getItem("lista_juegos");
  return datos ? JSON.parse(datos) : juegosPorDefecto;
}

// agrega o actualiza un juego en el catalogo
export function saveJuego(juego: Juego): Juego {
  const juegos = getJuegos();
  if (juego.id) {
    const pos = juegos.findIndex((j) => j.id === juego.id);
    if (pos !== -1) {
      juegos[pos] = juego;
    } else {
      juegos.push(juego);
    }
  } else {
    juego.id = "JUEGO-" + (juegos.length + 1);
    juegos.push(juego);
  }
  localStorage.setItem("lista_juegos", JSON.stringify(juegos));
  return juego;
}

// elimina un juego del catalogo por id
export function deleteJuego(id: string): void {
  const juegos = getJuegos();
  const filtrados = juegos.filter((j) => j.id !== id);
  localStorage.setItem("lista_juegos", JSON.stringify(filtrados));
}

// busca un juego especifico por su id
export function getJuegoById(id: string): Juego | null {
  const juegos = getJuegos();
  return juegos.find((j) => j.id === id) || null;
}

// lee la lista de usuarios guardados
export function getUsuarios(): Usuario[] {
  cargarDatosIniciales();
  const datos = localStorage.getItem("lista_usuarios");
  return datos ? JSON.parse(datos) : usuariosPorDefecto;
}

// guarda o modifica un usuario buscando por su run o correo
export function saveUsuario(usuario: Usuario): Usuario {
  const usuarios = getUsuarios();
  let runLimpio = usuario.run
    ? usuario.run.replace(/[^0-9kK]/g, "").toUpperCase()
    : "";
  if (!runLimpio) {
    runLimpio = "CLI-" + (usuarios.length + 1);
  }
  usuario.run = runLimpio;

  const pos = usuarios.findIndex(
    (u) =>
      u.run === runLimpio ||
      (u.correo &&
        usuario.correo &&
        u.correo.toLowerCase() === usuario.correo.toLowerCase())
  );

  if (pos !== -1) {
    usuarios[pos] = { ...usuarios[pos], ...usuario };
  } else {
    usuarios.push(usuario);
  }

  localStorage.setItem("lista_usuarios", JSON.stringify(usuarios));
  return usuario;
}

// borra un usuario por su run
export function deleteUsuario(run: string): void {
  const usuarios = getUsuarios();
  const runLimpio = run.replace(/[^0-9kK]/g, "").toUpperCase();
  const filtrados = usuarios.filter((u) => u.run !== runLimpio);
  localStorage.setItem("lista_usuarios", JSON.stringify(filtrados));
}

// busca un usuario por su run
export function getUsuarioByRun(run: string): Usuario | null {
  const usuarios = getUsuarios();
  const runLimpio = run.replace(/[^0-9kK]/g, "").toUpperCase();
  return usuarios.find((u) => u.run === runLimpio) || null;
}

// manejo de la sesion del usuario en sessionstorage (se borra al cerrar pestana)
export function getCurrentUser(): Usuario | null {
  if (typeof window === "undefined") return null;
  const u = sessionStorage.getItem("usuario_logeado");
  return u ? JSON.parse(u) : null;
}

export function setCurrentUser(usuario: Usuario): void {
  sessionStorage.setItem("usuario_logeado", JSON.stringify(usuario));
}

export function logoutUser(): void {
  sessionStorage.removeItem("usuario_logeado");
}

// funciones para gestionar los productos en el carrito de compras
export function getCarrito(): ItemCarrito[] {
  if (typeof window === "undefined") return [];
  const datos = localStorage.getItem("vapro_carrito");
  return datos ? JSON.parse(datos) : [];
}

export function guardarCarrito(carrito: ItemCarrito[]): void {
  localStorage.setItem("vapro_carrito", JSON.stringify(carrito));
}

// agrega un juego al carrito o suma la cantidad si ya estaba
export function agregarAlCarrito(juego: Juego, cantidad = 1): ItemCarrito[] {
  const carrito = getCarrito();
  const pos = carrito.findIndex((item) => item.id === juego.id);

  if (pos !== -1) {
    carrito[pos].cantidad += cantidad;
  } else {
    carrito.push({
      id: juego.id,
      nombre: juego.nombre,
      precio: juego.precio,
      imagen: juego.imagen,
      cantidad: cantidad,
    });
  }

  guardarCarrito(carrito);
  return carrito;
}

// quita un juego del carrito
export function eliminarDelCarrito(idJuego: string): ItemCarrito[] {
  const carrito = getCarrito();
  const filtrados = carrito.filter((item) => item.id !== idJuego);
  guardarCarrito(filtrados);
  return filtrados;
}

// cambia la cantidad de un item (si llega a 0 se elimina solo)
export function cambiarCantidadCarrito(
  idJuego: string,
  nuevaCantidad: number
): ItemCarrito[] {
  const carrito = getCarrito();
  const pos = carrito.findIndex((item) => item.id === idJuego);
  if (pos !== -1) {
    if (nuevaCantidad <= 0) {
      carrito.splice(pos, 1);
    } else {
      carrito[pos].cantidad = Number(nuevaCantidad);
    }
    guardarCarrito(carrito);
  }
  return carrito;
}

// vacia todos los items del carrito
export function vaciarCarrito(): void {
  localStorage.removeItem("vapro_carrito");
}

// calcula el total de unidades sumando las cantidades
export function cantidadTotalCarrito(items?: ItemCarrito[]): number {
  const carrito = items || getCarrito();
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}
