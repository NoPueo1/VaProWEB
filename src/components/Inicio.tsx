import Carrusel from "./Carrusel";
import Catalogo from "./Catalogo";
import type { Juego } from "../services/storage";

interface Props {
  juegos: Juego[];
  juegosDestacados: Juego[];
  alComprar: (juego: Juego) => void;
  alSeleccionar: (juego: Juego) => void;
}

function Inicio({ juegos, juegosDestacados, alComprar, alSeleccionar }: Props) {
  return (
    <>
      <Carrusel
        juegosDestacados={juegosDestacados}
        alSeleccionar={alSeleccionar}
      />
      <Catalogo
        juegos={juegos}
        alComprar={alComprar}
        alSeleccionar={alSeleccionar}
      />
    </>
  );
}

export default Inicio;
