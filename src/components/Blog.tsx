import { useState } from "react";
import Insignia from "./Insignia";

interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string[];
  notas?: string[];
  fecha: string;
  etiqueta: string;
  etiquetaClase: string;
  imagen: string;
}

const noticias: Noticia[] = [
  {
    id: 1,
    titulo: "El parche 2.0 de Cyberpunk 2099 ya está aquí",
    resumen:
      "Descubre todas las novedades, mejoras de rendimiento gráfico y el nuevo contenido de misiones que trae la actualización más esperada del año. ¡La ciudad de neón nunca se vio tan bien!",
    contenido: [
      "Después de meses de espera, los desarrolladores finalmente han lanzado el Parche 2.0. Esta actualización no solo corrige los errores reportados por la comunidad en los últimos meses, sino que expande el universo del juego introduciendo nuevas mecánicas de combate y un rediseño completo del sistema de conducción.",
      "Los jugadores ahora podrán experimentar un árbol de habilidades completamente rediseñado que permite especializaciones de ciberware mucho más profundas, adaptándose a cualquier estilo de juego, desde infiltración sigilosa hasta combate pesado.",
    ],
    notas: [
      "Rendimiento optimizado: Tasas de cuadros por segundo (FPS) más estables en todas las configuraciones gráficas.",
      "Nuevo distrito: Explora las profundidades de 'Neon Abyss', una nueva zona comercial llena de contratos inéditos.",
      "Comportamiento de NPCs y enemigos: Ahora reaccionan de manera más realista al entorno, multitudes y tus acciones.",
    ],
    fecha: "15 de Septiembre, 2026",
    etiqueta: "Actualización",
    etiquetaClase: "badge bg-primary fs-6 mb-3",
    imagen: "/Assets/juegos/cyberpunk2099.png",
  },
  {
    id: 2,
    titulo: "Resident Good 4 rompe récords de ventas",
    resumen:
      "El esperado remake ha superado todas las expectativas de la comunidad en su primera semana. Conoce los detalles del éxito rotundo y las primeras impresiones de los desarrolladores.",
    contenido: [
      "Apenas siete días después de su lanzamiento oficial en la plataforma Vapro, Resident Good 4 ha alcanzado cifras históricas, consolidándose como uno de los títulos de terror y supervivencia más vendidos del año.",
      "El equipo detrás del proyecto agradeció el apoyo masivo de la comunidad y confirmó que ya se encuentra trabajando en actualizaciones gratuitas que incorporarán el esperado modo mercenarios y mejoras de calidad de vida.",
    ],
    notas: [
      "Más de 3 millones de copias digitales vendidas en la primera semana a nivel global.",
      "Recepción unánime de la crítica especializada destacando la atmósfera opresiva y el rediseño sonoro.",
      "Compatibilidad total con sonido espacial 3D y tiempos de carga reducidos al mínimo.",
    ],
    fecha: "12 de Septiembre, 2026",
    etiqueta: "Lanzamiento",
    etiquetaClase: "badge bg-danger fs-6 mb-3",
    imagen: "/Assets/juegos/residentgood4.png",
  },
];

function Blog() {
  const [noticiaSeleccionada, setNoticiaSeleccionada] =
    useState<Noticia | null>(null);

  if (noticiaSeleccionada) {
    return (
      <main className="container my-5">
        <button
          type="button"
          className="btn btn-outline-light mb-4"
          onClick={() => setNoticiaSeleccionada(null)}
        >
          &larr; Volver al Blog
        </button>

        <article className="bg-dark bg-opacity-50 p-4 p-md-5 rounded-4 shadow-lg border border-secondary border-opacity-25">
          <Insignia clase={noticiaSeleccionada.etiquetaClase}>
            {noticiaSeleccionada.etiqueta}
          </Insignia>
          <h1 className="display-4 fw-bold text-white mb-3">
            {noticiaSeleccionada.titulo}
          </h1>
          <p className="text-white-50 mb-4">
            Publicado el {noticiaSeleccionada.fecha}
          </p>

          <img
            src={noticiaSeleccionada.imagen}
            className="img-fluid rounded-3 mb-5 w-100 shadow"
            alt={noticiaSeleccionada.titulo}
            style={{ maxHeight: "450px", objectFit: "cover" }}
          />

          <div className="text-light fs-5" style={{ lineHeight: "1.8" }}>
            <p className="lead fw-semibold text-white">
              {noticiaSeleccionada.resumen}
            </p>
            {noticiaSeleccionada.contenido.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}

            {noticiaSeleccionada.notas && (
              <>
                <h3 className="fw-bold mt-5 mb-3 text-white">
                  Puntos Destacados
                </h3>
                <ul>
                  {noticiaSeleccionada.notas.map((nota, i) => (
                    <li key={i} className="mb-2">
                      {nota}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <h1 className="display-4 fw-bold text-white mb-5 border-bottom border-secondary pb-3">
        Noticias Importantes
      </h1>

      <div className="row g-5">
        {noticias.map((item) => (
          <div key={item.id} className="col-md-6">
            <div className="card h-100 game-card bg-dark text-white border-0 shadow">
              <img
                src={item.imagen}
                className="card-img-top"
                alt={item.titulo}
                style={{ height: "320px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column p-4">
                <Insignia clase={item.etiquetaClase}>{item.etiqueta}</Insignia>
                <h2 className="card-title fw-bold">{item.titulo}</h2>
                <p className="card-text text-light fs-5 mt-2">{item.resumen}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center pt-4">
                  <small className="text-white-50">{item.fecha}</small>
                  <button
                    type="button"
                    className="btn btn-outline-light px-4"
                    onClick={() => setNoticiaSeleccionada(item)}
                  >
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Blog;