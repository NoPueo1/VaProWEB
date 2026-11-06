export interface RegionChile {
  id: string;
  nombre: string;
  comunas: string[];
}

// listado de regiones y comunas de chile
export const REGIONES_CHILE = [
    {
        id: "AP",
        nombre: "Arica y Parinacota",
        comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
    },
    {
        id: "TA",
        nombre: "TarapacÃ¡",
        comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "CamiÃ±a", "Colchane", "Huara", "Pica"]
    },
    {
        id: "AN",
        nombre: "Antofagasta",
        comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "OllagÃ¼e", "San Pedro de Atacama", "Tocopilla", "MarÃ­a Elena"]
    },
    {
        id: "AT",
        nombre: "Atacama",
        comunas: ["CopiapÃ³", "Caldera", "Tierra Amarilla", "ChaÃ±aral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
    },
    {
        id: "CO",
        nombre: "Coquimbo",
        comunas: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "VicuÃ±a", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "CombarbalÃ¡", "Monte Patria", "Punitaqui", "RÃ­o Hurtado"]
    },
    {
        id: "VA",
        nombre: "ValparaÃ­so",
        comunas: ["ValparaÃ­so", "Casablanca", "ConcÃ³n", "Juan FernÃ¡ndez", "PuchuncavÃ­", "Quintero", "ViÃ±a del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa MarÃ­a", "QuilpuÃ©", "Limache", "OlmuÃ©", "Villa Alemana"]
    },
    {
        id: "RM",
        nombre: "RegiÃ³n Metropolitana de Santiago",
        comunas: ["Santiago", "Cerrillos", "Cerro Navia", "ConchalÃ­", "El Bosque", "EstaciÃ³n Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "MaipÃº", "Ã‘uÃ±oa", "Pedro Aguirre Cerda", "PeÃ±alolÃ©n", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San JoaquÃ­n", "San Miguel", "San RamÃ³n", "Vitacura", "Puente Alto", "Pirque", "San JosÃ© de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "AlhuÃ©", "CuracavÃ­", "MarÃ­a Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "PeÃ±aflor"]
    },
    {
        id: "LI",
        nombre: "Libertador General Bernardo O'Higgins",
        comunas: ["Rancagua", "Codegua", "Coinco", "Coltauco", "DoÃ±ihue", "Graneros", "Las Cabras", "MachalÃ­", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "RequÃ­noa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "ChÃ©pica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
    },
    {
        id: "ML",
        nombre: "Maule",
        comunas: ["Talca", "ConstituciÃ³n", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "RÃ­o Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "CuricÃ³", "HualaÃ±Ã©", "LicantÃ©n", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "VichuquÃ©n", "Linares", "ColbÃºn", "LongavÃ­", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
    },
    {
        id: "NB",
        nombre: "Ã‘uble",
        comunas: ["ChillÃ¡n", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "ChillÃ¡n Viejo", "El Carmen", "Ninhue", "Ã‘iquÃ©n", "Pemuco", "Pinto", "Portezuelo", "QuillÃ³n", "Quirihue", "RÃ¡nquil", "San Carlos", "San FabiÃ¡n", "San Ignacio", "San NicolÃ¡s", "Treguaco", "Yungay"]
    },
    {
        id: "BI",
        nombre: "BiobÃ­o",
        comunas: ["ConcepciÃ³n", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "TomÃ©", "HualpÃ©n", "Lebu", "Arauco", "CaÃ±ete", "Contulmo", "Curanilahue", "Los Ãlamos", "TirÃºa", "Los Ãngeles", "Antuco", "Cabrero", "Laja", "MulchÃ©n", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa BÃ¡rbara", "Tucapel", "Yumbel", "Alto BiobÃ­o"]
    },
    {
        id: "AR",
        nombre: "La AraucanÃ­a",
        comunas: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "PitrufquÃ©n", "PucÃ³n", "Saavedra", "Teodoro Schmidt", "ToltÃ©n", "VilcÃºn", "Villarrica", "Cholchol", "Angol", "Collipulli", "CuracautÃ­n", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "PurÃ©n", "Renaico", "TraiguÃ©n", "Victoria"]
    },
    {
        id: "LR",
        nombre: "Los RÃ­os",
        comunas: ["Valdivia", "Corral", "Lanco", "Los Lagos", "MÃ¡fil", "Mariquina", "Paillaco", "Panguipulli", "La UniÃ³n", "Futrono", "Lago Ranco", "RÃ­o Bueno"]
    },
    {
        id: "LL",
        nombre: "Los Lagos",
        comunas: ["Puerto Montt", "Calbuco", "CochamÃ³", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "MaullÃ­n", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de VÃ©lez", "Dalcahue", "PuqueldÃ³n", "QueilÃ©n", "QuellÃ³n", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "RÃ­o Negro", "San Juan de la Costa", "San Pablo", "ChaitÃ©n", "FutaleufÃº", "HualaihuÃ©", "Palena"]
    },
    {
        id: "AI",
        nombre: "AysÃ©n del General Carlos IbÃ¡Ã±ez del Campo",
        comunas: ["Coyhaique", "Lago Verde", "AysÃ©n", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "RÃ­o IbÃ¡Ã±ez"]
    },
    {
        id: "MA",
        nombre: "Magallanes y de la AntÃ¡rtica Chilena",
        comunas: ["Punta Arenas", "Laguna Blanca", "RÃ­o Verde", "San Gregorio", "Cabo de Hornos (Navarino)", "AntÃ¡rtica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    }
];
