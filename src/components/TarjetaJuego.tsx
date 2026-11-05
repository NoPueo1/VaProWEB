import type { Juego } from "../services/storage";
import { formatoPesos } from "../services/validations";
import Boton from "./Boton";
import Insignia from "./Insignia";

interface Props {
  juego: Juego;
  alComprar?: (juego: Juego) => void;
  alSeleccionar?: (juego: Juego) => void;
}

function TarjetaJuego({ juego, alComprar, alSeleccionar }: Props) {
  return (
    <div className="col">
      <div className="card h-100 game-card bg-dark text-white border-0">
        <div
          role="button"
          tabIndex={0}
          onClick={() => alSeleccionar && alSeleccionar(juego)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={juego.imagen}
            className="card-img-top"
            alt={juego.nombre}
            style={{ height: "160px", objectFit: "cover", width: "100%" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/Assets/logo.png";
            }}
          />
        </div>
        <div className="card-body d-flex flex-column p-3">
          <h6
            className="card-title fw-bold text-truncate mb-2"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => alSeleccionar && alSeleccionar(juego)}
          >
            {juego.nombre}
          </h6>
          <div className="mb-2">
            {juego.etiquetas.map((tag) => (
              <Insignia key={tag} clase="badge bg-secondary me-1">
                {tag}
              </Insignia>
            ))}
          </div>
          <p className="small text-white-50 text-truncate mb-3">
            {juego.descripcion}
          </p>
          <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25">
            <span className="fs-6 fw-bold text-light">
              {formatoPesos(juego.precio)}
            </span>
            <Boton
              clase="btn btn-sm btn-morado px-3"
              alHacerClick={() => alComprar && alComprar(juego)}
            >
              Comprar
            </Boton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarjetaJuego;