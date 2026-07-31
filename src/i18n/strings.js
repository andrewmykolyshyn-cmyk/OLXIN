/**
 * OLXIN i18n Strings
 * 5 languages: es (default), en, ca, uk, ru
 * Complete translations for all UI strings.
 * Category display names are also translated.
 * User-generated content (ad titles/descriptions) is NOT translated.
 */

export const LANGUAGES = [
  { code: 'es', name: 'ES' },
  { code: 'en', name: 'EN' },
  { code: 'ca', name: 'CA' },
  { code: 'uk', name: 'UK' },
  { code: 'ru', name: 'RU' },
];

export const STRINGS = {
  // --------------------------------------------------------
  // Navigation
  // --------------------------------------------------------
  nav: {
    publish:    { es: 'Publicar anuncio',    en: 'Publish ad',         ca: 'Publicar anunci',       uk: 'Podati oholišennja', ru: 'Podat obyavlenie' },
    myAds:      { es: 'Mis anuncios',        en: 'My ads',             ca: 'Els meus anuncis',     uk: 'Moji oholišennja',   ru: 'Moi obyavleniya' },
    favorites:  { es: 'Favoritos',           en: 'Favorites',          ca: 'Preferits',            uk: 'Ulubleni',           ru: 'Izbrannoe' },
    chat:       { es: 'Chat',                en: 'Chat',               ca: 'Xat',                  uk: 'Čat',                ru: 'Chat' },
    admin:      { es: 'Admin',               en: 'Admin',              ca: 'Admin',                uk: 'Admin',              ru: 'Admin' },
    login:      { es: 'Iniciar sesion',      en: 'Sign in',            ca: 'Iniciar sessio',       uk: 'Uvit',               ru: 'Voyti' },
    logout:     { es: 'Cerrar sesion',       en: 'Sign out',           ca: 'Tancar sessio',        uk: 'Vijti',              ru: 'Vyyti' },
  },

  // --------------------------------------------------------
  // Home Page
  // --------------------------------------------------------
  home: {
    categoriesTitle: { es: 'Categorias',     en: 'Categories',         ca: 'Categories',           uk: 'Kategoriji',         ru: 'Kategorii' },
    featured:        { es: 'Anuncios destacados', en: 'Featured ads',  ca: 'Anuncis destacats',    uk: 'Rekomendovani oholišennja', ru: 'Izbrannye obyavleniya' },
    seeMore:         { es: 'Ver mas anuncios', en: 'See more ads',    ca: 'Veure mes anuncis',    uk: 'Pobачyty bilshe',   ru: 'Smotret dalshe' },
    trustTitle:      { es: 'Compra y vende con confianza', en: 'Buy and sell with confidence', ca: 'Compra i ven amb confianca', uk: 'Kupujte i prodavayte z vahoyu', ru: 'Pokupayte i prodavayte s doveriyem' },
    businessPromo:   { es: '¿Tienes una empresa de reformas o servicios?', en: 'Do you have a renovation or services business?', ca: 'Tens una empresa de reformes o serveis?', uk: 'U vas je firma z remontu abo poslug?', ru: 'U vas est firma po remontu ili uslugam?' },
    businessCta:     { es: 'Mas informacion', en: 'More information',  ca: 'Mes informacio',       uk: 'Bilshe informaciji',  ru: 'Bolshe informacii' },
  },

  // --------------------------------------------------------
  // Trust tiles
  // --------------------------------------------------------
  trust: {
    chat:      { es: 'Chat integrado',      en: 'Built-in chat',      ca: 'Xat integrat',          uk: 'Vbudovanyj čat',     ru: 'Vstroennyj chat' },
    shipping:  { es: 'OLXIN Envio',         en: 'OLXIN Shipping',     ca: 'OLXIN Enviament',      uk: 'OLXIN Dostavka',     ru: 'OLXIN Dostavka' },
    shippingDesc: { es: 'Correos, SEUR, MRW', en: 'Correos, SEUR, MRW', ca: 'Correos, SEUR, MRW', uk: 'Correos, SEUR, MRW', ru: 'Correos, SEUR, MRW' },
    protection:{ es: 'Proteccion al comprador', en: 'Buyer protection', ca: 'Proteccio al comprador', uk: 'Zahyst pokupcja',  ru: 'Zashita pokupatelya' },
    payment:   { es: 'Pago seguro',          en: 'Secure payment',    ca: 'Pagament segur',       uk: 'Bezpečna oplata',    ru: 'Bezopasnaya oplata' },
  },

  // --------------------------------------------------------
  // Filters
  // --------------------------------------------------------
  filters: {
    shipping:     { es: 'Con envio',         en: 'With shipping',      ca: 'Amb enviament',        uk: 'Z dostavkoju',       ru: 'S dostavkoj' },
    all:          { es: 'Todos',             en: 'All',                ca: 'Tots',                 uk: 'Vsi',                ru: 'Vse' },
    businesses:   { es: 'Empresas',          en: 'Businesses',         ca: 'Empreses',             uk: 'Pidpryjemstva',      ru: 'Kompanii' },
    private:      { es: 'Particulares',      en: 'Private',            ca: 'Particulars',          uk: 'Častni osoby',       ru: 'Chastnye lica' },
    sort:         { es: 'Ordenar',           en: 'Sort',               ca: 'Ordenar',              uk: 'Sortuvaty',          ru: 'Sortirovat' },
    recommended:  { es: 'Recomendados',      en: 'Recommended',        ca: 'Recomanats',           uk: 'Rekomendovani',      ru: 'Rekomendovannye' },
    newest:       { es: 'Mas recientes',     en: 'Newest',             ca: 'Mes recents',          uk: 'Najnoviji',          ru: 'Noveyshie' },
    priceAsc:     { es: 'Precio ↑',          en: 'Price ↑',            ca: 'Preu ↑',               uk: 'Cina ↑',             ru: 'Tsena ↑' },
    priceDesc:    { es: 'Precio ↓',          en: 'Price ↓',            ca: 'Preu ↓',               uk: 'Cina ↓',             ru: 'Tsena ↓' },
  },

  // --------------------------------------------------------
  // Listing Detail
  // --------------------------------------------------------
  listing: {
    back:         { es: '← Volver',          en: '← Back',             ca: '← Tornar',             uk: '← Nazad',            ru: '← Nazad' },
    negotiable:   { es: 'Negociable',        en: 'Negotiable',         ca: 'Negociable',           uk: 'Domovlenna',         ru: 'Dogovornaya' },
    contactChat:  { es: 'Contactar por chat', en: 'Contact via chat',  ca: 'Contactar per xat',    uk: 'Kontaktuvaty v čati', ru: 'Svyazatsya v chate' },
    showPhone:    { es: 'Ver telefono',      en: 'Show phone',         ca: 'Veure telefon',        uk: 'Pokažyty telefon',   ru: 'Pokazat telefon' },
    description:  { es: 'Descripcion',       en: 'Description',        ca: 'Descripcio',           uk: 'Opys',               ru: 'Opisanie' },
    shippingAvail:{ es: 'Envio disponible con OLXIN Envio', en: 'Shipping available with OLXIN', ca: 'Enviament disponible amb OLXIN', uk: 'Dostavka dostupna z OLXIN', ru: 'Dostavka dostupna s OLXIN' },
    safetyTip:    { es: 'Consejo de seguridad: No envies dinero por adelantado. Reune al vendedor en un lugar publico.', en: 'Safety tip: Do not send money in advance. Meet the seller in a public place.', ca: 'Consell de seguretat: No enviis diners per endavant. Troba al venedor en un lloc public.', uk: 'Porada bezpeky: Ne nadšylajte groši zavčasno. Zustrichtes z prodavcem u publicnomu misci.', ru: 'Sovet bezopasnosti: Ne otpravlyayte dengi zaranee. Vstrechaytes s prodavcom v publichnom meste.' },
    similarAds:   { es: 'Anuncios similares', en: 'Similar ads',       ca: 'Anuncis similars',     uk: 'Podibni oholišennja', ru: 'Pohozie obyavleniya' },
    rateSeller:   { es: 'Deja tu valoracion', en: 'Leave a rating',    ca: 'Deixa la teva valoracio', uk: 'Zalyšte svoju ocinku', ru: 'Ostavte svoyu ocenku' },
    reviews:      { es: 'Opiniones',         en: 'Reviews',            ca: 'Opinions',             uk: 'Vidгуky',            ru: 'Otzyvy' },
    leaveReview:  { es: 'Deja tu opinion',   en: 'Leave a review',     ca: 'Deixa la teva opinio', uk: 'Zalyšte svoj vidгuk', ru: 'Ostavte svoy otzyv' },
    thanksRating: { es: '¡Gracias por tu valoracion!', en: 'Thanks for your rating!', ca: 'Gracies per la teva valoracio!', uk: 'Djakuju za vashu ocinku!', ru: 'Spasibo za vashu ocenku!' },
    edit:         { es: 'Editar',            en: 'Edit',               ca: 'Editar',               uk: 'Redaguwaty',         ru: 'Redaktirovat' },
    delete:       { es: 'Borrar',            en: 'Delete',             ca: 'Esborrar',             uk: 'Vydalyty',           ru: 'Udalit' },
    deleteConfirm:{ es: '¿Estas seguro de borrar este anuncio?', en: 'Are you sure you want to delete this ad?', ca: 'Estas segur de esborrar aquest anunci?', uk: 'Vy virni, šcho chočete vydalyty ce oholišennja?', ru: 'Vy uvereny, chto khotite udalit eto obyavlenie?' },
    visits:       { es: 'visitas',           en: 'views',              ca: 'visites',              uk: 'perehlady',          ru: 'prosmotry' },
  },

  // --------------------------------------------------------
  // Publish
  // --------------------------------------------------------
  publish: {
    title:        { es: 'Publicar anuncio',  en: 'Publish ad',         ca: 'Publicar anunci',      uk: 'Podaty oholišennja',  ru: 'Podat obyavlenie' },
    titleLabel:   { es: 'Titulo',            en: 'Title',              ca: 'Titol',                uk: 'Nazva',              ru: 'Nazvanie' },
    titleHint:    { es: 'Maximo 70 caracteres', en: 'Max 70 characters', ca: 'Maxim 70 caracters',  uk: 'Maksymum 70 symvoliv', ru: 'Maksimum 70 simvolov' },
    category:     { es: 'Categoria',         en: 'Category',           ca: 'Categoria',            uk: 'Kategorija',         ru: 'Kategoriya' },
    selectCategory:{ es: 'Selecciona categoria', en: 'Select category', ca: 'Selecciona categoria', uk: 'Vyberyť kategoriju', ru: 'Vyberite kategoriyu' },
    price:        { es: 'Precio',            en: 'Price',              ca: 'Preu',                 uk: 'Cina',               ru: 'Tsena' },
    giveAway:     { es: 'Se regala',         en: 'Giving away',        ca: 'Es regala',            uk: 'Vidajetsja bezkoštovno', ru: 'Otdarim darom' },
    province:     { es: 'Provincia',         en: 'Province',           ca: 'Provincia',            uk: 'Oblast',             ru: 'Oblast' },
    photos:       { es: 'Fotos',             en: 'Photos',             ca: 'Fotos',                uk: 'Foto',               ru: 'Fotografii' },
    photosHint:   { es: 'Toca para anadir fotos (hasta 5)', en: 'Tap to add photos (up to 5)', ca: 'Toca per afegir fotos (fins a 5)', uk: 'Dodajte foto (do 5)', ru: 'Dobavte fotografii (do 5)' },
    description:  { es: 'Descripcion',       en: 'Description',        ca: 'Descripcio',           uk: 'Opys',               ru: 'Opisanie' },
    sellerType:   { es: 'Tipo de vendedor',  en: 'Seller type',        ca: 'Tipus de venedor',     uk: 'Typ prodavcja',      ru: 'Tip prodavca' },
    private:      { es: 'Particular',        en: 'Private',            ca: 'Particular',           uk: 'Častna osoba',       ru: 'Chastnoe lico' },
    business:     { es: 'Empresa',           en: 'Business',           ca: 'Empresa',              uk: 'Pidpryjemstvo',      ru: 'Kompaniya' },
    feeNote:      { es: 'Publicar un anuncio cuesta', en: 'Publishing an ad costs', ca: 'Publicar un anunci costa', uk: 'Publikacija oholišennja koštuje', ru: 'Publikaciya obyavleniya stoit' },
    payAndPublish:{ es: 'Pagar y publicar',  en: 'Pay and publish',    ca: 'Pagar i publicar',     uk: 'Zaplatyty ta opublikuvaty', ru: 'Zaplatit i opublikovat' },
    cancel:       { es: 'Cancelar',          en: 'Cancel',             ca: 'Cancelar',             uk: 'Skasuvaty',          ru: 'Otmenit' },
    titleRequired:{ es: 'El titulo es obligatorio', en: 'Title is required', ca: 'El titol es obligatori', uk: 'Nazva e obovjazkovoju', ru: 'Nazvanie obyazatelno' },
  },

  // --------------------------------------------------------
  // Checkout
  // --------------------------------------------------------
  checkout: {
    title:        { es: 'Pago del anuncio',  en: 'Ad payment',         ca: 'Pagament de lanunci',  uk: 'Oplata oholišennja',  ru: 'Oplata obyavleniya' },
    total:        { es: 'Total',             en: 'Total',              ca: 'Total',                uk: 'Vsego',              ru: 'Itogo' },
    pay:          { es: 'Pagar',             en: 'Pay',                ca: 'Pagar',                uk: 'Zaplatyty',          ru: 'Zaplatit' },
    processing:   { es: 'Procesando...',     en: 'Processing...',      ca: 'Processant...',        uk: 'Opracovujeťsja...',  ru: 'Obrabatyvaetsya...' },
    successTitle: { es: '¡Anuncio publicado!', en: 'Ad published!',   ca: 'Anunci publicat!',     uk: 'Oholišennja opublikovano!', ru: 'Obyavlenie opublikovano!' },
    successText:  { es: 'Tu anuncio ya esta visible en OLXIN.', en: 'Your ad is now visible on OLXIN.', ca: 'El teu anunci ja es visible a OLXIN.', uk: 'Vase oholišennja vže vydymo na OLXIN.', ru: 'Vase obyavlenie uzhe vidno na OLXIN.' },
    viewAd:       { es: 'Ver anuncio',       en: 'View ad',            ca: 'Veure anunci',         uk: 'Pobачyty oholišennja', ru: 'Smotret obyavlenie' },
    myAds:        { es: 'Mis anuncios',      en: 'My ads',             ca: 'Els meus anuncis',     uk: 'Moji oholišennja',   ru: 'Moi obyavleniya' },
    error:        { es: 'Error en el pago. Intentalo de nuevo.', en: 'Payment error. Please try again.', ca: 'Error en el pagament. Torna-ho a provar.', uk: 'Pomylka oplaty. Sprobujte šče raz.', ru: 'Oshibka oplaty. Poprobuyte eshche raz.' },
    demoMode:     { es: 'Modo demo - el pago es simulado', en: 'Demo mode - payment is simulated', ca: 'Mode demo - el pagament es simulat', uk: 'Demo rezym - oplata symuljujeťsja', ru: 'Demo rezhim - oplata simuliruetsya' },
  },

  // --------------------------------------------------------
  // My Ads
  // --------------------------------------------------------
  myAds: {
    title:        { es: 'Mis anuncios',      en: 'My ads',             ca: 'Els meus anuncis',     uk: 'Moji oholišennja',    ru: 'Moi obyavleniya' },
    empty:        { es: 'Aun no has publicado ningun anuncio.', en: 'You have not published any ads yet.', ca: 'Encara no has publicat cap anunci.', uk: 'Vy šče ne opublikuwaly žodnogo oholišennja.', ru: 'Vy eshche ne publikovali ni odnogo obyavleniya.' },
    publishFirst: { es: 'Publicar mi primer anuncio', en: 'Publish my first ad', ca: 'Publicar el meu primer anunci', uk: 'Podaty moje pershe oholišennja', ru: 'Podat moyo pervoe obyavlenie' },
    views:        { es: 'visitas',           en: 'views',              ca: 'visites',              uk: 'perehlady',          ru: 'prosmotry' },
    delete:       { es: 'Borrar',            en: 'Delete',             ca: 'Esborrar',             uk: 'Vydalyty',           ru: 'Udalit' },
    pending:      { es: 'Pendiente',         en: 'Pending',            ca: 'Pendent',              uk: 'Očikueťsja',         ru: 'V ozhidanii' },
  },

  // --------------------------------------------------------
  // Auth
  // --------------------------------------------------------
  auth: {
    signIn:       { es: 'Iniciar sesion',    en: 'Sign in',            ca: 'Iniciar sessio',       uk: 'Uvit',               ru: 'Voyti' },
    signUp:       { es: 'Crear cuenta',      en: 'Create account',     ca: 'Crear compte',         uk: 'Stvoryty oblikovyj zapys', ru: 'Sozdat akkaunt' },
    email:        { es: 'Correo electronico', en: 'Email',             ca: 'Correu electronic',    uk: 'Elektronna pošta',   ru: 'Elektronnaya pochta' },
    password:     { es: 'Contrasena',        en: 'Password',           ca: 'Contrasenya',          uk: 'Parol',              ru: 'Parol' },
    name:         { es: 'Nombre',            en: 'Name',               ca: 'Nom',                  uk: 'Imja',               ru: 'Imya' },
    createAccount:{ es: 'Crear cuenta',      en: 'Create account',     ca: 'Crear compte',         uk: 'Stvoryty oblikovyj zapys', ru: 'Sozdat akkaunt' },
    noAccount:    { es: '¿No tienes cuenta?', en: 'No account?',       ca: 'No tens compte?',      uk: 'Nemaje oblikovoho zapysu?', ru: 'Net akkaunta?' },
    hasAccount:   { es: '¿Ya tienes cuenta?', en: 'Already have an account?', ca: 'Ja tens compte?', uk: 'Vže je oblikovyj zapys?', ru: 'Uzhe est akkaunt?' },
    google:       { es: 'Continuar con Google', en: 'Continue with Google', ca: 'Continuar amb Google', uk: 'Prodovyty z Google', ru: 'Prodolzhit s Google' },
    checkEmail:   { es: 'Revisa tu correo para confirmar.', en: 'Check your email to confirm.', ca: 'Revisa el teu correu per confirmar.', uk: 'Perevirte svoju poštu dlja pidtverdzennja.', ru: 'Proverte svoyu pochtu dlya podtverzhdeniya.' },
  },

  // --------------------------------------------------------
  // Admin
  // --------------------------------------------------------
  admin: {
    login:        { es: 'Acceso de administrador', en: 'Admin login',  ca: 'Acces dadministrador', uk: 'Vhid admіnіstratora', ru: 'Vhod administratora' },
    enter:        { es: 'Entrar',              en: 'Enter',              ca: 'Entrar',               uk: 'Uvit',               ru: 'Voyti' },
    wrong:        { es: 'Credenciales incorrectas', en: 'Wrong credentials', ca: 'Credencials incorrectes', uk: 'Nepravilni dani', ru: 'Nevernye dannyje' },
    panel:        { es: 'Panel de administracion', en: 'Admin panel',  ca: 'Tauler dadministracio', uk: 'Panel adminіstratora', ru: 'Panel administratora' },
    site:         { es: 'Sitio',               en: 'Site',               ca: 'Lloc',                 uk: 'Sajt',               ru: 'Sayt' },
    categories:   { es: 'Categorias',          en: 'Categories',         ca: 'Categories',           uk: 'Kategoriji',         ru: 'Kategorii' },
    ads:          { es: 'Anuncios',            en: 'Ads',                ca: 'Anuncis',              uk: 'Oholišennja',        ru: 'Obyavleniya' },
    pricing:      { es: 'Precios',             en: 'Pricing',            ca: 'Preus',                uk: 'Ciny',               ru: 'Tsiny' },
    siteName:     { es: 'Nombre del sitio',    en: 'Site name',          ca: 'Nom del lloc',         uk: 'Nazva sajtu',        ru: 'Nazvanie sayta' },
    primaryColor: { es: 'Color principal',     en: 'Primary color',      ca: 'Color principal',      uk: 'Osnovnyj kolir',     ru: 'Osnovnoy tsvet' },
    pricePerAd:   { es: 'Precio por anuncio (centimos)', en: 'Price per ad (cents)', ca: 'Preu per anunci (centims)', uk: 'Cina za oholišennja (centy)', ru: 'Tsena za obyavlenie (tsenty)' },
    save:         { es: 'Guardar',             en: 'Save',               ca: 'Desar',                uk: 'Zberehty',           ru: 'Sokhranit' },
    saved:        { es: 'Guardado',            en: 'Saved',              ca: 'Desat',                uk: 'Zbereženo',          ru: 'Sokhraneno' },
    addCategory:  { es: 'Anadir categoria',    en: 'Add category',       ca: 'Afegir categoria',     uk: 'Dodaty kategoriju',  ru: 'Dobavit kategoriyu' },
    delete:       { es: 'Eliminar',            en: 'Delete',             ca: 'Eliminar',             uk: 'Vydalyty',           ru: 'Udalit' },
    adminMode:    { es: 'Modo administrador',  en: 'Admin mode',         ca: 'Mode administrador',   uk: 'Rezym admіnіstratora', ru: 'Rezhim administratora' },
    exit:         { es: 'Salir',               en: 'Exit',               ca: 'Sortir',               uk: 'Vyjty',              ru: 'Vyyti' },
  },

  // --------------------------------------------------------
  // Errors / Empty
  // --------------------------------------------------------
  errors: {
    generic:      { es: 'Algo salio mal. Intentalo de nuevo.', en: 'Something went wrong. Please try again.', ca: 'Alguna cosa ha anat malament. Torna-ho a provar.', uk: 'Scos pishlo ne tak. Sprobujte šče raz.', ru: 'Chto-to poshlo ne tak. Poprobuyte eshche raz.' },
    retry:        { es: 'Reintentar',         en: 'Retry',              ca: 'Tornar a provar',      uk: 'Sprobuvaty šče raz', ru: 'Povtorit poputku' },
    noResults:    { es: 'No hay anuncios que coincidan.', en: 'No matching ads found.', ca: 'No hi ha anuncis que coincideixin.', uk: 'Nemaє oholišennja, šco vidpovidajut.', ru: 'Net podhodyashchikh obyavleniy.' },
    removeFilter: { es: 'Prueba a quitar algun filtro.', en: 'Try removing some filters.', ca: 'Prova a treure algun filtre.', uk: 'Sprobujte znjaty dejaki filtry.', ru: 'Poprobuyte ubrat nekotorye filtry.' },
    notFound:     { es: 'Pagina no encontrada', en: 'Page not found',   ca: 'Pagina no trobada',    uk: 'Storinku ne znajdeno', ru: 'Stranitsa ne naydena' },
    goHome:       { es: 'Volver al inicio',   en: 'Back to home',       ca: 'Tornar a linici',      uk: 'Povernutyś na holovnu', ru: 'Vernutsa na glavnuyu' },
  },

  // --------------------------------------------------------
  // Footer columns
  // --------------------------------------------------------
  footer: {
    about:        { es: 'OLXIN',             en: 'OLXIN',              ca: 'OLXIN',                uk: 'OLXIN',              ru: 'OLXIN' },
    howToBuy:     { es: 'Como comprar',      en: 'How to buy',         ca: 'Com comprar',          uk: 'Jak kupuvaty',       ru: 'Kak pokupat' },
    howToSell:    { es: 'Como vender',       en: 'How to sell',        ca: 'Com vendre',           uk: 'Jak prodavaty',      ru: 'Kak prodavat' },
    paymentServices: { es: 'Servicios de pago', en: 'Payment services', ca: 'Serveis de pagament', uk: 'Poslugy oplaty',     ru: 'Platezhnye uslugi' },
    forBusiness:  { es: 'OLXIN para empresas', en: 'OLXIN for business', ca: 'OLXIN per empreses',  uk: 'OLXIN dlja biznesu', ru: 'OLXIN dlya biznesa' },
    shipping:     { es: 'OLXIN Envio',       en: 'OLXIN Shipping',     ca: 'OLXIN Enviament',      uk: 'OLXIN Dostavka',     ru: 'OLXIN Dostavka' },
    blog:         { es: 'Blog',              en: 'Blog',               ca: 'Blog',                 uk: 'Blog',               ru: 'Blog' },
    help:         { es: 'Ayuda y seguridad', en: 'Help & safety',      ca: 'Ajuda i seguretat',    uk: 'Dovidka ta bezpeka', ru: 'Pomoshch i bezopasnost' },
    helpCenter:   { es: 'Centro de ayuda',   en: 'Help center',        ca: 'Centre dajuda',        uk: 'Centr dovidky',      ru: 'Centr pomoshchi' },
    safety:       { es: 'Seguridad',         en: 'Safety',             ca: 'Seguretat',            uk: 'Bezpeka',            ru: 'Bezopasnost' },
    terms:        { es: 'Terminos de uso',   en: 'Terms of use',       ca: 'Termes dus',           uk: 'Umovy vykorystannja', ru: 'Usloviya ispolzovaniya' },
    privacy:      { es: 'Politica de privacidad', en: 'Privacy policy', ca: 'Politica de privacitat', uk: 'Polityka konfidencijnosti', ru: 'Politika konfidencialnosti' },
    cookies:      { es: 'Cookies',           en: 'Cookies',            ca: 'Cookies',              uk: 'Kuku',               ru: 'Kuki' },
    work:         { es: 'Trabaja con nosotros', en: 'Work with us',    ca: 'Treballa amb nosaltres', uk: 'Pracjujte z namy',  ru: 'Rabotayte s nami' },
    jobs:         { es: 'Empleo',            en: 'Jobs',               ca: 'Feina',                uk: 'Robota',             ru: 'Rabota' },
    advertising:  { es: 'Publicidad',        en: 'Advertising',        ca: 'Publicitat',           uk: 'Reklama',            ru: 'Reklama' },
    press:        { es: 'Prensa',            en: 'Press',              ca: 'Premsa',               uk: 'Presa',              ru: 'Pressa' },
    sitemap:      { es: 'Mapa del sitio',    en: 'Sitemap',            ca: 'Mapa del lloc',        uk: 'Karta sajtu',        ru: 'Karta sayta' },
    contact:      { es: 'Contacto',          en: 'Contact',            ca: 'Contacte',             uk: 'Kontakt',            ru: 'Kontakt' },
    app:          { es: 'Descarga la app',   en: 'Download the app',   ca: 'Descarrega lapp',      uk: 'Zavantažyť aplikaciju', ru: 'Skachat prilozhenie' },
    appNote:      { es: 'Pronto disponible en App Store y Google Play', en: 'Coming soon to App Store and Google Play', ca: 'Properament a lApp Store i Google Play', uk: 'Nebavdna v App Store ta Google Play', ru: 'Skoro v App Store i Google Play' },
    disclaimer:   { es: 'No afiliado a OLX Group', en: 'Not affiliated with OLX Group', ca: 'No afiliat a OLX Group', uk: 'Ne afiliovano z OLX Group', ru: 'Ne affilirovano s OLX Group' },
  },

  // --------------------------------------------------------
  // Coming soon toast
  // --------------------------------------------------------
  comingSoon:   { es: 'Proximamente',        en: 'Coming soon',        ca: 'Properament',          uk: 'Nebavdna',           ru: 'Skoro' },

  // --------------------------------------------------------
  // Category names (16 categories x 5 languages)
  // --------------------------------------------------------
  categories: {
    motor:       { es: 'Coches',             en: 'Cars',               ca: 'Cotxes',               uk: 'Avtomobili',         ru: 'Avtomobili' },
    motos:       { es: 'Motos',              en: 'Motorbikes',         ca: 'Motos',                uk: 'Motocykly',          ru: 'Motocikly' },
    inmo:        { es: 'Inmobiliaria',       en: 'Real estate',        ca: 'Immobiliaria',         uk: 'Neruxomist',         ru: 'Nedvizhimost' },
    empleo:      { es: 'Empleo',             en: 'Jobs',               ca: 'Feina',                uk: 'Robota',             ru: 'Rabota' },
    reformas:    { es: 'Construccion y reformas', en: 'Construction & renovation', ca: 'Construccio i reformes', uk: 'Budivnyctvo ta remont', ru: 'Stroitelstvo i remont' },
    electro:     { es: 'Electronica',        en: 'Electronics',        ca: 'Electronica',          uk: 'Elektronika',        ru: 'Elektronika' },
    hogar:       { es: 'Hogar y jardin',     en: 'Home & garden',      ca: 'Llar i jardi',         uk: 'Dim ta sad',         ru: 'Dom i sad' },
    moda:        { es: 'Moda',               en: 'Fashion',            ca: 'Moda',                 uk: 'Moda',               ru: 'Moda' },
    deporte:     { es: 'Deporte y ocio',     en: 'Sports & leisure',   ca: 'Esport i oci',         uk: 'Sport ta dozvilja',  ru: 'Sport i dosug' },
    bebes:       { es: 'Bebes y ninos',      en: 'Babies & kids',      ca: 'Nadons i nens',        uk: 'Dity ta dlja ditej', ru: 'Detya i detskie' },
    animales:    { es: 'Animales',           en: 'Pets',               ca: 'Animals',              uk: 'Tvaryny',            ru: 'Zhivotnye' },
    servicios:   { es: 'Servicios',          en: 'Services',           ca: 'Serveis',              uk: 'Posluhy',            ru: 'Uslugi' },
    coleccion:   { es: 'Coleccionismo',      en: 'Collectibles',       ca: 'Col-leccionisme',      uk: 'Kolekcionuvannja',   ru: 'Kollektsionirovanie' },
    agro:        { es: 'Agricultura',        en: 'Agriculture',        ca: 'Agricultura',          uk: 'Silke hospodarstvo', ru: 'Selskoe hozyaystvo' },
    gratis:      { es: 'Regalo',             en: 'Free stuff',         ca: 'De franc',             uk: 'Bezkoštovno',        ru: 'Darom' },
    alquiler:    { es: 'Alquiler',           en: 'Rental',             ca: 'Lloguer',              uk: 'Orehnda',            ru: 'Arenda' },
  },
};

/**
 * Helper to get a nested string from the STRINGS object.
 * Usage: getString('nav.publish', 'es') → 'Publicar anuncio'
 * Falls back to Spanish if the key or language is missing.
 */
export function getString(key, lang) {
  const parts = key.split('.');
  let obj = STRINGS;
  for (const part of parts) {
    obj = obj?.[part];
    if (!obj) return key; // fallback: return the key itself
  }
  return obj[lang] || obj['es'] || key;
}
