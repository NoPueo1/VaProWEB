function SobreNosotros() {
  return (
    <main className="container my-5">
      <article className="card card-admin p-4 p-md-5 rounded-3 mb-5">
        <h1 className="display-4 fw-bold text-white mb-3">
          Vapro del Duoc al éxito mundial
        </h1>
        <h4 className="fw-bold text-white mb-4">
          De un proyecto universitario a ser el pilar fundamental de la industria
          del gaming en Latinoamérica.
        </h4>

        <img
          src="/Assets/nosotros.png"
          className="img-fluid rounded-3 mb-5 w-100 shadow"
          alt="Sobre Nosotros Vapro"
          style={{ maxHeight: "450px", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/Assets/logo.png";
          }}
        />

        <div className="text-light fs-5" style={{ lineHeight: "1.8" }}>
          <p className="lead fw-semibold text-white">
            Todo comenzó en las aulas de <strong>Duoc UC</strong>. Éramos dos
            apasionados estudiantes de la carrera de Informática con una visión
            compartida. Durante el exigente ramo de{" "}
            <em>Desarrollo Fullstack 2</em>, se nos asignó lo que parecía ser un
            desafío académico más: crear una tienda web desde cero.
          </p>

          <p>
            Sin embargo, decidimos ir mucho más allá de la nota. Construimos la
            primera versión de <strong>Vapro</strong> (Provoste-Vasquez
            Corporation) con la firme convicción de que los gamers chilenos y
            latinoamericanos merecían una plataforma más justa, rápida y
            orientada a la comunidad.
          </p>

          <p>
            Hoy, años después de aquella entrega final, lo que nació entre tazas de
            café, trasnoches programando y compilando código, se ha convertido en un
            auténtico pilar de la industria de los videojuegos. Hemos revolucionado
            la forma en que los jugadores adquieren sus títulos, compitiendo codo a
            codo con los gigantes del mercado global.
          </p>
        </div>
      </article>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card card-admin h-100 p-4 shadow-sm text-white">
            <div className="card-body">
              <h3 className="fw-bold mb-3 border-bottom pb-2">Nuestra Misión</h3>
              <p className="text-light opacity-90">
                Proveer una plataforma confiable, rápida y moderna para la compra y
                gestión de videojuegos digitales, garantizando una experiencia
                transparente, segura y orientada a satisfacer las necesidades de
                cada jugador.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card card-admin h-100 p-4 shadow-sm text-white">
            <div className="card-body">
              <h3 className="fw-bold mb-3 border-bottom pb-2">Nuestra Visión</h3>
              <p className="text-light opacity-90">
                Posicionarnos como la tienda digital de referencia para gamers en
                Chile y Latinoamérica, destacando por nuestro catálogo diverso,
                soporte cercano y el constante desarrollo de soluciones
                tecnológicas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-5">
        <h3 className="text-white fw-bold mb-4 border-bottom pb-2">
          Equipo de Desarrollo
        </h3>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card card-admin h-100 p-4 shadow-sm text-white">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "55px",
                    height: "55px",
                    backgroundColor: "#3e1d64",
                    border: "2px solid #56288c",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                  }}
                >
                  VP
                </div>
                <div>
                  <h4 className="mb-0 fw-bold">Vicente Provoste</h4>
                  <small className="text-white-50">
                    Co-Fundador & Desarrollador Frontend
                  </small>
                </div>
              </div>
              <p className="text-light opacity-90 mb-0">
                Diseño visual, experiencia de usuario, maquetación de la vitrina
                pública, pie de página y la estética espacial distintiva de la
                plataforma Vapro.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card card-admin h-100 p-4 shadow-sm text-white">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "55px",
                    height: "55px",
                    backgroundColor: "#3e1d64",
                    border: "2px solid #56288c",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                  }}
                >
                  AV
                </div>
                <div>
                  <h4 className="mb-0 fw-bold">Agustín Vásquez</h4>
                  <small className="text-white-50">
                    Co-Fundador & Desarrollador Fullstack
                  </small>
                </div>
              </div>
              <p className="text-light opacity-90 mb-0">
                Manejo de LocalStorage, panel de administración con mantenedores
                de juegos y usuarios, y la validación de formularios y RUT chileno.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SobreNosotros;