import type { Juego } from "../data/juegos";

interface Props {
  juegosDestacados: Juego[];
  alSeleccionar?: (juego: Juego) => void;
}

function Carrusel({ juegosDestacados, alSeleccionar }: Props) {
  if (juegosDestacados.length === 0) return null;

  return (
    <div
      id="carruselJuegosDestacados"
      className="carousel slide carousel-fade rounded-2 border border-secondary border-opacity-25 mb-5"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {juegosDestacados.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carruselJuegosDestacados"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner rounded-3">
        {juegosDestacados.map((juego, index) => (
          <div
            key={juego.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => alSeleccionar && alSeleccionar(juego)}
          >
            <img
              src={juego.imagen}
              className="d-block w-100"
              alt={juego.nombre}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-2">
              <h5>{juego.nombre}</h5>
              <p className="mb-0">{juego.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carruselJuegosDestacados"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carruselJuegosDestacados"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carrusel;
