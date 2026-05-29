// =========================================================
// Product catalog — based on the price sheet (foto del cliente)
// Material: Chapa SAE 1010 1.6mm, pintado epoxi
// Photos: /images/catalog/_MG_XXXX.webp (sin fondo) when available
// Prices are placeholder ARS — vendor confirms before launch
// =========================================================

export const FAMILIES = [
  { id: 'todas',       label: 'Todas' },
  { id: 'asadores',    label: 'Asadores criollos' },
  { id: 'parrillas',   label: 'Parrillas' },
  { id: 'discos',      label: 'Discos' },
  { id: 'carros',      label: 'Carros asadores' },
  { id: 'fogoneros',   label: 'Fogoneros' },
  { id: 'quemadores',  label: 'Quemadores' },
  { id: 'rockets',     label: 'Rockets' },
  { id: 'planchas',    label: 'Planchas' },
  { id: 'extras',      label: 'Extras' }
];

// ARS formatter
export const ars = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0
});

export const PRODUCTS = [
  // === ASADORES CRIOLLOS ===
  {
    id: 'asador-criollo-grande',
    family: 'asadores',
    name: 'Asador Criollo Grande',
    size: '110 × 50 cm',
    image: null,
    desc: 'El cruz de toda la vida. Para corderos enteros, costillares de novillo o un lechón completo. Patas regulables, varilla 12 mm.',
    specs: { 'Medidas': '110 × 50 cm', 'Para': 'Cordero entero / costillar grande', 'Patas': 'Regulables' },
    price: 185000
  },
  {
    id: 'asador-criollo-mediano',
    family: 'asadores',
    name: 'Asador Criollo Mediano',
    size: '95 × 46 cm',
    image: null,
    desc: 'Tamaño todoterreno. Para un costillar familiar de 6–8 personas, sin tener que doblar el pollo.',
    specs: { 'Medidas': '95 × 46 cm', 'Para': '6–8 personas', 'Patas': 'Regulables' },
    price: 155000
  },
  {
    id: 'asador-criollo-chico',
    family: 'asadores',
    name: 'Asador Criollo Chico',
    size: '80 × 42 cm',
    image: null,
    desc: 'Para escapadas, terrazas chicas o asados de hasta 4 personas. Ligero, plegable, entra en el baúl.',
    specs: { 'Medidas': '80 × 42 cm', 'Para': '3–4 personas', 'Patas': 'Plegables' },
    price: 125000
  },

  // === PARRILLAS ===
  {
    id: 'parrilla-estructural-1m',
    family: 'parrillas',
    name: 'Parrilla Estructural 1 m',
    size: '100 × 48 × 22 cm',
    image: null,
    desc: 'La parrilla seria. Estructura de hierro, parrilla en V para escurrir la grasa, leñero al costado y mesada de servicio.',
    specs: { 'Medidas': '100 × 48 cm', 'Altura': '22 cm', 'Parrilla': 'En V, varilla 8 mm' },
    price: 420000
  },
  {
    id: 'parrilla-estructural-07m',
    family: 'parrillas',
    name: 'Parrilla Estructural 0,7 m',
    size: '70 × 48 × 22 cm',
    image: null,
    desc: 'Misma calidad que la de 1 m, en formato compacto. Ideal para departamento con balcón o quincho chico.',
    specs: { 'Medidas': '70 × 48 cm', 'Altura': '22 cm', 'Parrilla': 'En V, varilla 8 mm' },
    price: 340000
  },
  {
    id: 'parrilla-fija-desmontable',
    family: 'parrillas',
    name: 'Parrilla Fija / Desmontable',
    size: '0,45 × 0,84 m',
    image: '/images/catalog/_MG_2974.webp',
    desc: 'Parrilla redonda con cruz alta para asador colgado y solera redonda. Desmontable para transporte. Perfecta para combinar fuegos.',
    specs: { 'Medidas': '0,45 × 0,84 m', 'Modalidades': 'Fija o desmontable', 'Plus': 'Cruz alta incluida' },
    price: 295000
  },

  // === DISCOS ===
  {
    id: 'disco-arado',
    family: 'discos',
    name: 'Disco de Arado',
    size: '45 cm Ø',
    image: null,
    desc: 'El clásico de la cocina del campo. Para chivito, mondongo, paella criolla. Manijas de madera de algarrobo, patas en trípode.',
    specs: { 'Diámetro': '45 cm', 'Manijas': 'Algarrobo', 'Patas': 'Trípode plegable' },
    price: 95000
  },
  {
    id: 'parradisco',
    family: 'discos',
    name: 'Parradisco',
    size: '45 cm Ø',
    image: '/images/catalog/_MG_2875.webp',
    desc: 'Disco + parrilla redonda con asas + trípode alto. Lo mejor de dos mundos: planchás abajo, asás arriba.',
    specs: { 'Diámetro': '45 cm', 'Altura': '95 cm aprox', 'Plus': 'Parrilla redonda incluida' },
    price: 175000
  },
  {
    id: 'fogon-disco',
    family: 'discos',
    name: 'Fogón Disco',
    size: '80 cm Ø',
    image: '/images/catalog/_MG_3036.webp',
    desc: 'Solera de 80 cm para fuego abierto. Con disco de arado de regalo. Para juntadas grandes en el quincho o el campo.',
    specs: { 'Diámetro': '80 cm', 'Incluye': 'Disco de arado', 'Material': 'Chapa 1,6 mm' },
    price: 215000
  },

  // === CARROS ASADORES ===
  {
    id: 'carro-asador',
    family: 'carros',
    name: 'Carro Asador',
    size: '100 × 75 × 12 cm',
    image: '/images/catalog/_MG_3041.webp',
    desc: 'La parrilla móvil con tapa. Leñero lateral, mesada de madera, ruedas inflables. Para llevar a la quinta o sacarla al jardín.',
    specs: { 'Medidas': '100 × 75 cm', 'Altura': '12 cm', 'Ruedas': 'Sí, inflables' },
    price: 385000
  },
  {
    id: 'carro-asador-tapa',
    family: 'carros',
    name: 'Carro Asador con Tapa',
    size: '100 × 75 cm',
    image: '/images/catalog/_MG_3059.webp',
    desc: 'Carro asador con tapa rebatible y portacuchillos. Ahorra carbón y permite cocción tipo ahumado bajo. Mango de madera.',
    specs: { 'Medidas': '100 × 75 cm', 'Tapa': 'Rebatible con bisagras', 'Plus': 'Portacuchillos integrado' },
    price: 445000
  },
  {
    id: 'carro-asador-redonda',
    family: 'carros',
    name: 'Carro Asador c/ Parrilla Redonda',
    size: '100 × 75 × 12 cm',
    image: null,
    desc: 'Versión con parrilla redonda colgante + solera. Permite asar a las brasas o suspendido. Doble servicio.',
    specs: { 'Medidas': '100 × 75 cm', 'Parrilla': 'Redonda colgante', 'Solera': 'Sí' },
    price: 405000
  },

  // === FOGONEROS ===
  {
    id: 'fogonero-comun',
    family: 'fogoneros',
    name: 'Fogonero Común',
    size: '37 × 20 × 47 cm',
    image: '/images/catalog/_MG_2928.webp',
    desc: 'Fogonero de uso rudo. Para tener fuego siempre listo en el patio. Patas robustas, salida de aire calculada.',
    specs: { 'Medidas': '37 × 20 cm', 'Altura': '47 cm', 'Plus': 'Salida de aire optimizada' },
    price: 75000
  },
  {
    id: 'fogonero-uruguayo',
    family: 'fogoneros',
    name: 'Fogonero Uruguayo',
    size: '37 × 20 cm',
    image: null,
    desc: 'Versión sin patas, para apoyar al lado de la parrilla y hacer brasas de leña en paralelo. El secreto del asado uruguayo.',
    specs: { 'Medidas': '37 × 20 cm', 'Tipo': 'Sin patas, apoyable', 'Uso': 'Brasas de leña paralelo' },
    price: 58000
  },
  {
    id: 'fogonero-estante-rueda',
    family: 'fogoneros',
    name: 'Fogonero c/ Estante y Rueda',
    size: '37 × 20 × 47 cm',
    image: null,
    desc: 'Fogonero con estante inferior para leña y dos ruedas para moverlo sin romperse la espalda. El favorito del asador profesional.',
    specs: { 'Medidas': '37 × 20 cm', 'Altura': '47 cm', 'Plus': 'Estante + 2 ruedas' },
    price: 92000
  },

  // === QUEMADORES ===
  {
    id: 'quemador-fijo',
    family: 'quemadores',
    name: 'Quemador Fijo',
    size: '35 cm Ø',
    image: null,
    desc: 'Quemador a gas de dos anillos. Potencia para hervir un perol grande en minutos. Conexión 1/4".',
    specs: { 'Diámetro': '35 cm', 'Anillos': '2 (dos arcos)', 'Conexión': '1/4" gas' },
    price: 88000
  },
  {
    id: 'quemador-desmontable',
    family: 'quemadores',
    name: 'Quemador Desmontable',
    size: '35 cm Ø',
    image: '/images/catalog/_MG_2889.webp',
    desc: 'Mismo quemador, en versión desarmable. Trípode robusto que se guarda sin ocupar espacio.',
    specs: { 'Diámetro': '35 cm', 'Anillos': '2 (dos aros)', 'Plus': 'Desarmable' },
    price: 95000
  },
  {
    id: 'quemador-portagarrafa',
    family: 'quemadores',
    name: 'Quemador Portagarrafa',
    size: '35 cm Ø',
    image: '/images/catalog/_MG_2911.webp',
    desc: 'Quemador alto con trípode móvil sobre ruedas. Diseñado para apoyar la garrafa abajo. Cómodo, seguro, transportable.',
    specs: { 'Diámetro': '35 cm', 'Anillos': '2 (dos aros)', 'Plus': 'Sostén garrafa + ruedas' },
    price: 125000
  },
  {
    id: 'quemador-plancheta',
    family: 'quemadores',
    name: 'Quemador Plancheta',
    size: '34 × 54 cm',
    image: null,
    desc: 'Quemador rectangular específico para planchetas y planchas churrasqueras. Llama distribuida pareja.',
    specs: { 'Medidas': '34 × 54 cm', 'Tipo': 'Rectangular', 'Uso': 'Plancha / chursaquera' },
    price: 115000
  },

  // === ROCKETS ===
  {
    id: 'rocket-grande',
    family: 'rockets',
    name: 'Rocket Grande',
    size: '80 × 40 cm',
    image: '/images/catalog/_MG_2970.webp',
    desc: 'Cocina rocket de leña con cámara de combustión optimizada. Quema 1/3 de la leña con el doble de calor. Para guisos y ollas grandes.',
    specs: { 'Medidas': '80 × 40 cm', 'Combustible': 'Leña fina', 'Plus': 'Eficiencia 3x' },
    price: 178000
  },
  {
    id: 'rocket-chico',
    family: 'rockets',
    name: 'Rocket Chico',
    size: '70 × 40 cm',
    image: '/images/catalog/_MG_2952.webp',
    desc: 'Versión compacta del rocket. Mismo principio, menos consumo. Perfecto para terraza o uso semanal.',
    specs: { 'Medidas': '70 × 40 cm', 'Combustible': 'Leña fina', 'Plus': 'Portable' },
    price: 142000
  },

  // === PLANCHAS ===
  {
    id: 'plancha-churrasquera-3',
    family: 'planchas',
    name: 'Plancha Churrasquera 3 mm',
    size: '50 × 30 × 3 cm',
    image: null,
    desc: 'Plancha de acero macizo para milanesas, bifes y vegetales. Espesor 3 mm — uso doméstico intenso.',
    specs: { 'Medidas': '50 × 30 cm', 'Espesor': '3 mm', 'Material': 'Acero macizo' },
    price: 68000
  },
  {
    id: 'plancha-churrasquera-6',
    family: 'planchas',
    name: 'Plancha Churrasquera 6 mm',
    size: '50 × 30 × 6 cm',
    image: null,
    desc: 'Plancha gruesa, retención de calor brutal. La que usan los restaurantes. Espesor 6 mm.',
    specs: { 'Medidas': '50 × 30 cm', 'Espesor': '6 mm', 'Uso': 'Profesional / intensivo' },
    price: 115000
  },

  // === EXTRAS ===
  {
    id: 'duomo-completo',
    family: 'extras',
    name: 'Duomo Completo',
    size: '1,20 m',
    image: null,
    desc: 'Horno duomo de campaña, 1,20 m de diámetro. Para pizza, pan, cordero al barro y horneado lento. Aislación cerámica.',
    specs: { 'Diámetro': '1,20 m', 'Uso': 'Pizza, pan, asados al horno', 'Aislación': 'Manta cerámica' },
    price: 685000
  },
  {
    id: 'set-asador',
    family: 'extras',
    name: 'Set Asador (Pala + Pinza + Atizador)',
    size: 'Set 3 piezas',
    image: null,
    desc: 'El kit clásico: pala para mover brasas, atizador para acomodar leños, pinza para dar vuelta el chorizo sin quemarse.',
    specs: { 'Piezas': 'Pala, pinza, atizador', 'Mango': 'Madera dura', 'Material': 'Acero 1010' },
    price: 38000
  }
];

export function productById(id) {
  return PRODUCTS.find(p => p.id === id);
}

export function productsByFamily(family) {
  if (!family || family === 'todas') return PRODUCTS;
  return PRODUCTS.filter(p => p.family === family);
}
