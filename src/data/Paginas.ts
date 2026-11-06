export interface Pagina {
  nombre: string;
  ruta: string;
  nombreCorto: string;
}

export const PAGINAS: Pagina[] = [
  {
    nombre: "Página Principal",
    ruta: "/",
    nombreCorto: "Inicio",
  },
  {
    nombre: "Productos",
    ruta: "/productos",
    nombreCorto: "Productos",
  },
  {
    nombre: "Sobre Nosotros",
    ruta: "/nosotros",
    nombreCorto: "Nosotros",
  },
  {
    nombre: "Blog",
    ruta: "/blog",
    nombreCorto: "Blog",
  },
  {
    nombre: "Contacto",
    ruta: "/contacto",
    nombreCorto: "Contacto",
  },
];
