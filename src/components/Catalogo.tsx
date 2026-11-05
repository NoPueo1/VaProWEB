import type { Juego } from "../data/juegos";
import TarjetaJuego from "./TarjetaJuego";
import Boton from "./Boton";

interface Props {
  juegos: Juego[];
  alComprar: (juego: Juego) => void;
  alSeleccionar: (juego: Juego) => void;
}

function Catalogo({ juegos, alComprar, alSeleccionar }: Props) {
  return (
    <section id="productos" className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h3 className="text-white mb-0">Destacados y Recomendados</h3>
        <Boton
          clase="btn btn-sm btn-outline-light"
          alHacerClick={() =>
            alert(`Catálogo completo: ${juegos.length} juegos disponibles.`)
          }
        >
          Ver todos ({juegos.length})
        </Boton>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {juegos.map((juego) => (
          <TarjetaJuego
            key={juego.id}
            juego={juego}
            alComprar={alComprar}
            alSeleccionar={alSeleccionar}
          />
        ))}
      </div>
    </section>
  );
}

export default Catalogo;
