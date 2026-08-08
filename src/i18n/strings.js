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
    publish:    { es: 'Publicar anuncio',    en: 'Publish ad',         ca: 'Publicar anunci',       uk: 'Подати оголошення',        ru: 'Подать объявление' },
    myAds:      { es: 'Mis anuncios',        en: 'My ads',             ca: 'Els meus anuncis',      uk: 'Мої оголошення',           ru: 'Мои объявления' },
    favorites:  { es: 'Favoritos',           en: 'Favorites',          ca: 'Preferits',             uk: 'Улюблені',                 ru: 'Избранное' },
    chat:       { es: 'Chat',                en: 'Chat',               ca: 'Xat',                   uk: 'Чат',                      ru: 'Чат' },
    admin:      { es: 'Admin',               en: 'Admin',              ca: 'Admin',                 uk: 'Адмін',                    ru: 'Админ' },
    login:      { es: 'Iniciar sesion',      en: 'Sign in',            ca: 'Iniciar sessio',        uk: 'Увійти',                   ru: 'Войти' },
    logout:     { es: 'Cerrar sesion',       en: 'Sign out',           ca: 'Tancar sessio',         uk: 'Вийти',                    ru: 'Выйти' },
  },

  // --------------------------------------------------------
  // Home Page
  // --------------------------------------------------------
  home: {
    categoriesTitle: { es: 'Categorias',     en: 'Categories',         ca: 'Categories',            uk: 'Категорії',                    ru: 'Категории' },
    featured:        { es: 'Anuncios destacados', en: 'Featured ads',  ca: 'Anuncis destacats',     uk: 'Рекомендовані оголошення',     ru: 'Рекомендуемые объявления' },
    seeMore:         { es: 'Ver mas anuncios', en: 'See more ads',    ca: 'Veure mes anuncis',      uk: 'Побачити більше',              ru: 'Смотреть больше' },
    trustTitle:      { es: 'Compra y vende con confianza', en: 'Buy and sell with confidence', ca: 'Compra i ven amb confianca', uk: 'Купуйте і продавайте з довірою', ru: 'Покупайте и продавайте с доверием' },
    businessPromo:   { es: '¿Tienes una empresa de reformas o servicios?', en: 'Do you have a renovation or services business?', ca: 'Tens una empresa de reformes o serveis?', uk: 'У вас є фірма з ремонту або послуг?', ru: 'У вас есть фирма по ремонту или услугам?' },
    businessCta:     { es: 'Mas informacion', en: 'More information',  ca: 'Mes informacio',        uk: 'Більше інформації',            ru: 'Больше информации' },
  },

  // --------------------------------------------------------
  // Trust tiles
  // --------------------------------------------------------
  trust: {
    chat:      { es: 'Chat integrado',      en: 'Built-in chat',      ca: 'Xat integrat',           uk: 'Вбудований чат',       ru: 'Встроенный чат' },
    shipping:  { es: 'OLXIN Envio',         en: 'OLXIN Shipping',     ca: 'OLXIN Enviament',       uk: 'OLXIN Доставка',        ru: 'OLXIN Доставка' },
    shippingDesc: { es: 'Correos, SEUR, MRW', en: 'Correos, SEUR, MRW', ca: 'Correos, SEUR, MRW', uk: 'Correos, SEUR, MRW',    ru: 'Correos, SEUR, MRW' },
    protection:{ es: 'Proteccion al comprador', en: 'Buyer protection', ca: 'Proteccio al comprador', uk: 'Захист покупця',   ru: 'Защита покупателя' },
    payment:   { es: 'Pago seguro',          en: 'Secure payment',    ca: 'Pagament segur',         uk: 'Безпечна оплата',      ru: 'Безопасная оплата' },
  },

  // --------------------------------------------------------
  // Chat
  // --------------------------------------------------------
  chat: {
    support:        { es: 'Soporte OLXIN',       en: 'OLXIN Support',      ca: 'Suport OLXIN',        uk: 'Підтримка OLXIN',        ru: 'Поддержка OLXIN' },
    contactSupport: { es: 'Contactar soporte',   en: 'Contact support',   ca: 'Contactar suport',    uk: 'Написати в підтримку',   ru: 'Написать в поддержку' },
    emptyTitle:     { es: 'No tienes chats',     en: 'No chats yet',      ca: 'No tens xats',        uk: 'У вас ще немає чатів',   ru: 'У вас ещё нет чатов' },
    emptyMessage:   { es: 'Cuando contactes con un vendedor o soporte, aparecera aqui.', en: 'When you contact a seller or support, it will appear here.', ca: 'Quan contactis amb un venedor o suport, apareixera aqui.', uk: 'Коли ви напишете продавцю або в підтримку, чат з\u2019явиться тут.', ru: 'Когда вы напишете продавцу или в поддержку, чат появится здесь.' },
    noMessages:     { es: 'Aun no hay mensajes', en: 'No messages yet',   ca: 'Encara no hi ha missatges', uk: 'Повідомлень ще немає', ru: 'Сообщений пока нет' },
    placeholder:    { es: 'Escribe un mensaje...', en: 'Type a message...', ca: 'Escriu un missatge...', uk: 'Напишіть повідомлення...', ru: 'Напишите сообщение...' },
    send:           { es: 'Enviar',              en: 'Send',               ca: 'Enviar',              uk: 'Надіслати',              ru: 'Отправить' },
  },

  // --------------------------------------------------------
  // Filters
  // --------------------------------------------------------
  filters: {
    shipping:     { es: 'Con envio',         en: 'With shipping',      ca: 'Amb enviament',        uk: 'З доставкою',        ru: 'С доставкой' },
    all:          { es: 'Todos',             en: 'All',                ca: 'Tots',                 uk: 'Всі',                ru: 'Все' },
    businesses:   { es: 'Empresas',          en: 'Businesses',         ca: 'Empreses',             uk: 'Підприємства',       ru: 'Компании' },
    private:      { es: 'Particulares',      en: 'Private',            ca: 'Particulars',          uk: 'Приватні особи',     ru: 'Частные лица' },
    sort:         { es: 'Ordenar',           en: 'Sort',               ca: 'Ordenar',              uk: 'Сортувати',          ru: 'Сортировать' },
    recommended:  { es: 'Recomendados',      en: 'Recommended',        ca: 'Recomanats',           uk: 'Рекомендовані',      ru: 'Рекомендуемые' },
    newest:       { es: 'Mas recientes',     en: 'Newest',             ca: 'Mes recents',          uk: 'Найновіші',          ru: 'Новейшие' },
    priceAsc:     { es: 'Precio ↑',          en: 'Price ↑',            ca: 'Preu ↑',               uk: 'Ціна ↑',             ru: 'Цена ↑' },
    priceDesc:    { es: 'Precio ↓',          en: 'Price ↓',            ca: 'Preu ↓',               uk: 'Ціна ↓',             ru: 'Цена ↓' },
  },

  // --------------------------------------------------------
  // Listing Detail
  // --------------------------------------------------------
  listing: {
    back:         { es: '← Volver',          en: '← Back',             ca: '← Tornar',             uk: '← Назад',                    ru: '← Назад' },
    negotiable:   { es: 'Negociable',        en: 'Negotiable',         ca: 'Negociable',           uk: 'Договірна',                  ru: 'Договорная' },
    contactChat:  { es: 'Contactar por chat', en: 'Contact via chat',  ca: 'Contactar per xat',    uk: 'Зв\u2019язатися в чаті',      ru: 'Связаться в чате' },
    showPhone:    { es: 'Ver telefono',      en: 'Show phone',         ca: 'Veure telefon',        uk: 'Показати телефон',           ru: 'Показать телефон' },
    description:  { es: 'Descripcion',       en: 'Description',        ca: 'Descripcio',           uk: 'Опис',                       ru: 'Описание' },
    shippingAvail:{ es: 'Envio disponible con OLXIN Envio', en: 'Shipping available with OLXIN', ca: 'Enviament disponible amb OLXIN', uk: 'Доставка доступна з OLXIN', ru: 'Доставка доступна с OLXIN' },
    safetyTip:    { es: 'Consejo de seguridad: No envies dinero por adelantado. Reune al vendedor en un lugar publico.', en: 'Safety tip: Do not send money in advance. Meet the seller in a public place.', ca: 'Consell de seguretat: No enviis diners per endavant. Troba al venedor en un lloc public.', uk: 'Порада безпеки: Не надсилайте гроші завчасно. Зустрічайтесь з продавцем у публічному місці.', ru: 'Совет безопасности: Не отправляйте деньги заранее. Встречайтесь с продавцом в публичном месте.' },
    similarAds:   { es: 'Anuncios similares', en: 'Similar ads',       ca: 'Anuncis similars',     uk: 'Подібні оголошення',         ru: 'Похожие объявления' },
    rateSeller:   { es: 'Deja tu valoracion', en: 'Leave a rating',    ca: 'Deixa la teva valoracio', uk: 'Залиште свою оцінку',     ru: 'Оставьте свою оценку' },
    reviews:      { es: 'Opiniones',         en: 'Reviews',            ca: 'Opinions',             uk: 'Відгуки',                    ru: 'Отзывы' },
    leaveReview:  { es: 'Deja tu opinion',   en: 'Leave a review',     ca: 'Deixa la teva opinio', uk: 'Залиште свій відгук',        ru: 'Оставьте свой отзыв' },
    thanksRating: { es: '¡Gracias por tu valoracion!', en: 'Thanks for your rating!', ca: 'Gracies per la teva valoracio!', uk: 'Дякуємо за вашу оцінку!', ru: 'Спасибо за вашу оценку!' },
    edit:         { es: 'Editar',            en: 'Edit',               ca: 'Editar',               uk: 'Редагувати',                 ru: 'Редактировать' },
    delete:       { es: 'Borrar',            en: 'Delete',             ca: 'Esborrar',             uk: 'Видалити',                   ru: 'Удалить' },
    deleteConfirm:{ es: '¿Estas seguro de borrar este anuncio?', en: 'Are you sure you want to delete this ad?', ca: 'Estas segur de esborrar aquest anunci?', uk: 'Ви впевнені, що хочете видалити це оголошення?', ru: 'Вы уверены, что хотите удалить это объявление?' },
    visits:       { es: 'visitas',           en: 'views',              ca: 'visites',              uk: 'переглядів',                 ru: 'просмотров' },
  },

  // --------------------------------------------------------
  // Publish
  // --------------------------------------------------------
  publish: {
    title:        { es: 'Publicar anuncio',  en: 'Publish ad',         ca: 'Publicar anunci',      uk: 'Подати оголошення',        ru: 'Подать объявление' },
    titleLabel:   { es: 'Titulo',            en: 'Title',              ca: 'Titol',                uk: 'Назва',                    ru: 'Название' },
    titleHint:    { es: 'Maximo 70 caracteres', en: 'Max 70 characters', ca: 'Maxim 70 caracters',  uk: 'Максимум 70 символів',     ru: 'Максимум 70 символов' },
    category:     { es: 'Categoria',         en: 'Category',           ca: 'Categoria',            uk: 'Категорія',                ru: 'Категория' },
    selectCategory:{ es: 'Selecciona categoria', en: 'Select category', ca: 'Selecciona categoria', uk: 'Виберіть категорію',      ru: 'Выберите категорию' },
    price:        { es: 'Precio',            en: 'Price',              ca: 'Preu',                 uk: 'Ціна',                     ru: 'Цена' },
    giveAway:     { es: 'Se regala',         en: 'Giving away',        ca: 'Es regala',            uk: 'Віддається безкоштовно',   ru: 'Отдаётся даром' },
    province:     { es: 'Provincia',         en: 'Province',           ca: 'Provincia',            uk: 'Провінція',                ru: 'Провинция' },
    photos:       { es: 'Fotos',             en: 'Photos',             ca: 'Fotos',                uk: 'Фото',                     ru: 'Фотографии' },
    photosHint:   { es: 'Toca para anadir fotos (hasta 5)', en: 'Tap to add photos (up to 5)', ca: 'Toca per afegir fotos (fins a 5)', uk: 'Натисніть, щоб додати фото (до 5)', ru: 'Нажмите, чтобы добавить фото (до 5)' },
    description:  { es: 'Descripcion',       en: 'Description',        ca: 'Descripcio',           uk: 'Опис',                     ru: 'Описание' },
    sellerType:   { es: 'Tipo de vendedor',  en: 'Seller type',        ca: 'Tipus de venedor',     uk: 'Тип продавця',             ru: 'Тип продавца' },
    private:      { es: 'Particular',        en: 'Private',            ca: 'Particular',           uk: 'Приватна особа',           ru: 'Частное лицо' },
    business:     { es: 'Empresa',           en: 'Business',           ca: 'Empresa',              uk: 'Підприємство',             ru: 'Компания' },
    feeNote:      { es: 'Publicar un anuncio cuesta', en: 'Publishing an ad costs', ca: 'Publicar un anunci costa', uk: 'Публікація оголошення коштує', ru: 'Публикация объявления стоит' },
    payAndPublish:{ es: 'Pagar y publicar',  en: 'Pay and publish',    ca: 'Pagar i publicar',     uk: 'Оплатити та опублікувати', ru: 'Оплатить и опубликовать' },
    cancel:       { es: 'Cancelar',          en: 'Cancel',             ca: 'Cancelar',             uk: 'Скасувати',                ru: 'Отменить' },
    titleRequired:{ es: 'El titulo es obligatorio', en: 'Title is required', ca: 'El titol es obligatori', uk: 'Назва є обов\u2019язковою', ru: 'Название обязательно' },
  },

  // --------------------------------------------------------
  // Checkout
  // --------------------------------------------------------
  checkout: {
    title:        { es: 'Pago del anuncio',  en: 'Ad payment',         ca: 'Pagament de lanunci',  uk: 'Оплата оголошення',        ru: 'Оплата объявления' },
    total:        { es: 'Total',             en: 'Total',              ca: 'Total',                uk: 'Всього',                   ru: 'Итого' },
    pay:          { es: 'Pagar',             en: 'Pay',                ca: 'Pagar',                uk: 'Оплатити',                 ru: 'Оплатить' },
    processing:   { es: 'Procesando...',     en: 'Processing...',      ca: 'Processant...',        uk: 'Обробляється...',          ru: 'Обрабатывается...' },
    successTitle: { es: '¡Anuncio publicado!', en: 'Ad published!',   ca: 'Anunci publicat!',     uk: 'Оголошення опубліковано!', ru: 'Объявление опубликовано!' },
    successText:  { es: 'Tu anuncio ya esta visible en OLXIN.', en: 'Your ad is now visible on OLXIN.', ca: 'El teu anunci ja es visible a OLXIN.', uk: 'Ваше оголошення вже видно на OLXIN.', ru: 'Ваше объявление уже видно на OLXIN.' },
    viewAd:       { es: 'Ver anuncio',       en: 'View ad',            ca: 'Veure anunci',         uk: 'Переглянути оголошення',   ru: 'Смотреть объявление' },
    myAds:        { es: 'Mis anuncios',      en: 'My ads',             ca: 'Els meus anuncis',     uk: 'Мої оголошення',           ru: 'Мои объявления' },
    error:        { es: 'Error en el pago. Intentalo de nuevo.', en: 'Payment error. Please try again.', ca: 'Error en el pagament. Torna-ho a provar.', uk: 'Помилка оплати. Спробуйте ще раз.', ru: 'Ошибка оплаты. Попробуйте ещё раз.' },
    demoMode:     { es: 'Modo demo - el pago es simulado', en: 'Demo mode - payment is simulated', ca: 'Mode demo - el pagament es simulat', uk: 'Демо режим - оплата симулюється', ru: 'Демо режим - оплата симулируется' },
  },

  // --------------------------------------------------------
  // My Ads
  // --------------------------------------------------------
  myAds: {
    title:        { es: 'Mis anuncios',      en: 'My ads',             ca: 'Els meus anuncis',     uk: 'Мої оголошення',            ru: 'Мои объявления' },
    empty:        { es: 'Aun no has publicado ningun anuncio.', en: 'You have not published any ads yet.', ca: 'Encara no has publicat cap anunci.', uk: 'Ви ще не опублікували жодного оголошення.', ru: 'Вы ещё не публиковали ни одного объявления.' },
    publishFirst: { es: 'Publicar mi primer anuncio', en: 'Publish my first ad', ca: 'Publicar el meu primer anunci', uk: 'Подати моє перше оголошення', ru: 'Подать моё первое объявление' },
    views:        { es: 'visitas',           en: 'views',              ca: 'visites',              uk: 'переглядів',                ru: 'просмотров' },
    delete:       { es: 'Borrar',            en: 'Delete',             ca: 'Esborrar',             uk: 'Видалити',                  ru: 'Удалить' },
    pending:      { es: 'Pendiente',         en: 'Pending',            ca: 'Pendent',              uk: 'Очікується',                ru: 'В ожидании' },
  },

  // --------------------------------------------------------
  // Auth
  // --------------------------------------------------------
  auth: {
    signIn:       { es: 'Iniciar sesion',    en: 'Sign in',            ca: 'Iniciar sessio',       uk: 'Увійти',                        ru: 'Войти' },
    signUp:       { es: 'Crear cuenta',      en: 'Create account',     ca: 'Crear compte',         uk: 'Створити акаунт',               ru: 'Создать аккаунт' },
    email:        { es: 'Correo electronico', en: 'Email',             ca: 'Correu electronic',    uk: 'Електронна пошта',              ru: 'Электронная почта' },
    password:     { es: 'Contrasena',        en: 'Password',           ca: 'Contrasenya',          uk: 'Пароль',                        ru: 'Пароль' },
    name:         { es: 'Nombre',            en: 'Name',               ca: 'Nom',                  uk: 'Ім\u2019я',                     ru: 'Имя' },
    createAccount:{ es: 'Crear cuenta',      en: 'Create account',     ca: 'Crear compte',         uk: 'Створити акаунт',               ru: 'Создать аккаунт' },
    noAccount:    { es: '¿No tienes cuenta?', en: 'No account?',       ca: 'No tens compte?',      uk: 'Немає акаунта?',                ru: 'Нет аккаунта?' },
    hasAccount:   { es: '¿Ya tienes cuenta?', en: 'Already have an account?', ca: 'Ja tens compte?', uk: 'Вже є акаунт?',               ru: 'Уже есть аккаунт?' },
    google:       { es: 'Continuar con Google', en: 'Continue with Google', ca: 'Continuar amb Google', uk: 'Продовжити з Google',     ru: 'Продолжить с Google' },
    checkEmail:   { es: 'Revisa tu correo para confirmar.', en: 'Check your email to confirm.', ca: 'Revisa el teu correu per confirmar.', uk: 'Перевірте свою пошту для підтвердження.', ru: 'Проверьте свою почту для подтверждения.' },
  },

  // --------------------------------------------------------
  // Admin
  // --------------------------------------------------------
  admin: {
    login:        { es: 'Acceso de administrador', en: 'Admin login',  ca: 'Acces dadministrador', uk: 'Вхід адміністратора',   ru: 'Вход администратора' },
    enter:        { es: 'Entrar',              en: 'Enter',              ca: 'Entrar',               uk: 'Увійти',                ru: 'Войти' },
    wrong:        { es: 'Credenciales incorrectas', en: 'Wrong credentials', ca: 'Credencials incorrectes', uk: 'Невірні дані',   ru: 'Неверные данные' },
    panel:        { es: 'Panel de administracion', en: 'Admin panel',  ca: 'Tauler dadministracio', uk: 'Панель адміністратора', ru: 'Панель администратора' },
    site:         { es: 'Sitio',               en: 'Site',               ca: 'Lloc',                 uk: 'Сайт',                  ru: 'Сайт' },
    categories:   { es: 'Categorias',          en: 'Categories',         ca: 'Categories',           uk: 'Категорії',             ru: 'Категории' },
    ads:          { es: 'Anuncios',            en: 'Ads',                ca: 'Anuncis',              uk: 'Оголошення',            ru: 'Объявления' },
    pricing:      { es: 'Precios',             en: 'Pricing',            ca: 'Preus',                uk: 'Ціни',                  ru: 'Цены' },
    siteName:     { es: 'Nombre del sitio',    en: 'Site name',          ca: 'Nom del lloc',         uk: 'Назва сайту',           ru: 'Название сайта' },
    primaryColor: { es: 'Color principal',     en: 'Primary color',      ca: 'Color principal',      uk: 'Основний колір',        ru: 'Основной цвет' },
    pricePerAd:   { es: 'Precio por anuncio (centimos)', en: 'Price per ad (cents)', ca: 'Preu per anunci (centims)', uk: 'Ціна за оголошення (центи)', ru: 'Цена за объявление (центы)' },
    save:         { es: 'Guardar',             en: 'Save',               ca: 'Desar',                uk: 'Зберегти',              ru: 'Сохранить' },
    saved:        { es: 'Guardado',            en: 'Saved',              ca: 'Desat',                uk: 'Збережено',             ru: 'Сохранено' },
    addCategory:  { es: 'Anadir categoria',    en: 'Add category',       ca: 'Afegir categoria',     uk: 'Додати категорію',      ru: 'Добавить категорию' },
    delete:       { es: 'Eliminar',            en: 'Delete',             ca: 'Eliminar',             uk: 'Видалити',              ru: 'Удалить' },
    adminMode:    { es: 'Modo administrador',  en: 'Admin mode',         ca: 'Mode administrador',   uk: 'Режим адміністратора',  ru: 'Режим администратора' },
    exit:         { es: 'Salir',               en: 'Exit',               ca: 'Sortir',               uk: 'Вийти',                 ru: 'Выйти' },
  },

  // --------------------------------------------------------
  // Errors / Empty
  // --------------------------------------------------------
  errors: {
    generic:      { es: 'Algo salio mal. Intentalo de nuevo.', en: 'Something went wrong. Please try again.', ca: 'Alguna cosa ha anat malament. Torna-ho a provar.', uk: 'Щось пішло не так. Спробуйте ще раз.', ru: 'Что-то пошло не так. Попробуйте ещё раз.' },
    retry:        { es: 'Reintentar',         en: 'Retry',              ca: 'Tornar a provar',      uk: 'Спробувати ще раз',       ru: 'Повторить попытку' },
    noResults:    { es: 'No hay anuncios que coincidan.', en: 'No matching ads found.', ca: 'No hi ha anuncis que coincideixin.', uk: 'Немає оголошень, що відповідають.', ru: 'Нет подходящих объявлений.' },
    removeFilter: { es: 'Prueba a quitar algun filtro.', en: 'Try removing some filters.', ca: 'Prova a treure algun filtre.', uk: 'Спробуйте зняти деякі фільтри.', ru: 'Попробуйте убрать некоторые фильтры.' },
    notFound:     { es: 'Pagina no encontrada', en: 'Page not found',   ca: 'Pagina no trobada',    uk: 'Сторінку не знайдено',    ru: 'Страница не найдена' },
    goHome:       { es: 'Volver al inicio',   en: 'Back to home',       ca: 'Tornar a linici',      uk: 'Повернутися на головну',  ru: 'Вернуться на главную' },
  },

  // --------------------------------------------------------
  // Footer columns
  // --------------------------------------------------------
  footer: {
    about:        { es: 'OLXIN',             en: 'OLXIN',              ca: 'OLXIN',                uk: 'OLXIN',                       ru: 'OLXIN' },
    howToBuy:     { es: 'Como comprar',      en: 'How to buy',         ca: 'Com comprar',          uk: 'Як купувати',                 ru: 'Как покупать' },
    howToSell:    { es: 'Como vender',       en: 'How to sell',        ca: 'Com vendre',           uk: 'Як продавати',                ru: 'Как продавать' },
    paymentServices: { es: 'Servicios de pago', en: 'Payment services', ca: 'Serveis de pagament', uk: 'Послуги оплати',              ru: 'Платёжные услуги' },
    forBusiness:  { es: 'OLXIN para empresas', en: 'OLXIN for business', ca: 'OLXIN per empreses',  uk: 'OLXIN для бізнесу',          ru: 'OLXIN для бизнеса' },
    shipping:     { es: 'OLXIN Envio',       en: 'OLXIN Shipping',     ca: 'OLXIN Enviament',      uk: 'OLXIN Доставка',              ru: 'OLXIN Доставка' },
    blog:         { es: 'Blog',              en: 'Blog',               ca: 'Blog',                 uk: 'Блог',                        ru: 'Блог' },
    help:         { es: 'Ayuda y seguridad', en: 'Help & safety',      ca: 'Ajuda i seguretat',    uk: 'Довідка та безпека',          ru: 'Помощь и безопасность' },
    helpCenter:   { es: 'Centro de ayuda',   en: 'Help center',        ca: 'Centre dajuda',        uk: 'Центр довідки',               ru: 'Центр помощи' },
    safety:       { es: 'Seguridad',         en: 'Safety',             ca: 'Seguretat',            uk: 'Безпека',                     ru: 'Безопасность' },
    terms:        { es: 'Terminos de uso',   en: 'Terms of use',       ca: 'Termes dus',           uk: 'Умови використання',          ru: 'Условия использования' },
    privacy:      { es: 'Politica de privacidad', en: 'Privacy policy', ca: 'Politica de privacitat', uk: 'Політика конфіденційності', ru: 'Политика конфиденциальности' },
    cookies:      { es: 'Cookies',           en: 'Cookies',            ca: 'Cookies',              uk: 'Файли cookie',                ru: 'Файлы cookie' },
    work:         { es: 'Trabaja con nosotros', en: 'Work with us',    ca: 'Treballa amb nosaltres', uk: 'Працюйте з нами',           ru: 'Работайте с нами' },
    jobs:         { es: 'Empleo',            en: 'Jobs',               ca: 'Feina',                uk: 'Робота',                      ru: 'Работа' },
    advertising:  { es: 'Publicidad',        en: 'Advertising',        ca: 'Publicitat',           uk: 'Реклама',                     ru: 'Реклама' },
    press:        { es: 'Prensa',            en: 'Press',              ca: 'Premsa',               uk: 'Преса',                       ru: 'Пресса' },
    sitemap:      { es: 'Mapa del sitio',    en: 'Sitemap',            ca: 'Mapa del lloc',        uk: 'Карта сайту',                 ru: 'Карта сайта' },
    contact:      { es: 'Contacto',          en: 'Contact',            ca: 'Contacte',             uk: 'Контакт',                     ru: 'Контакт' },
    app:          { es: 'Descarga la app',   en: 'Download the app',   ca: 'Descarrega lapp',      uk: 'Завантажити застосунок',      ru: 'Скачать приложение' },
    appNote:      { es: 'Pronto disponible en App Store y Google Play', en: 'Coming soon to App Store and Google Play', ca: 'Properament a lApp Store i Google Play', uk: 'Незабаром в App Store та Google Play', ru: 'Скоро в App Store и Google Play' },
    disclaimer:   { es: 'No afiliado a OLX Group', en: 'Not affiliated with OLX Group', ca: 'No afiliat a OLX Group', uk: 'Не афілійовано з OLX Group', ru: 'Не аффилировано с OLX Group' },
  },

  // --------------------------------------------------------
  // Coming soon toast
  // --------------------------------------------------------
  comingSoon:   { es: 'Proximamente',        en: 'Coming soon',        ca: 'Properament',          uk: 'Незабаром',           ru: 'Скоро' },

  // --------------------------------------------------------
  // Category names (16 categories x 5 languages)
  // --------------------------------------------------------
  categories: {
    motor:       { es: 'Coches',             en: 'Cars',               ca: 'Cotxes',               uk: 'Автомобілі',              ru: 'Автомобили' },
    motos:       { es: 'Motos',              en: 'Motorbikes',         ca: 'Motos',                uk: 'Мотоцикли',               ru: 'Мотоциклы' },
    inmo:        { es: 'Inmobiliaria',       en: 'Real estate',        ca: 'Immobiliaria',         uk: 'Нерухомість',             ru: 'Недвижимость' },
    empleo:      { es: 'Empleo',             en: 'Jobs',               ca: 'Feina',                uk: 'Робота',                  ru: 'Работа' },
    reformas:    { es: 'Construccion y reformas', en: 'Construction & renovation', ca: 'Construccio i reformes', uk: 'Будівництво та ремонт', ru: 'Строительство и ремонт' },
    electro:     { es: 'Electronica',        en: 'Electronics',        ca: 'Electronica',          uk: 'Електроніка',             ru: 'Электроника' },
    hogar:       { es: 'Hogar y jardin',     en: 'Home & garden',      ca: 'Llar i jardi',         uk: 'Дім та сад',              ru: 'Дом и сад' },
    moda:        { es: 'Moda',               en: 'Fashion',            ca: 'Moda',                 uk: 'Мода',                    ru: 'Мода' },
    deporte:     { es: 'Deporte y ocio',     en: 'Sports & leisure',   ca: 'Esport i oci',         uk: 'Спорт та дозвілля',       ru: 'Спорт и досуг' },
    bebes:       { es: 'Bebes y ninos',      en: 'Babies & kids',      ca: 'Nadons i nens',        uk: 'Діти та малюки',          ru: 'Дети и малыши' },
    animales:    { es: 'Animales',           en: 'Pets',               ca: 'Animals',              uk: 'Тварини',                 ru: 'Животные' },
    servicios:   { es: 'Servicios',          en: 'Services',           ca: 'Serveis',              uk: 'Послуги',                 ru: 'Услуги' },
    coleccion:   { es: 'Coleccionismo',      en: 'Collectibles',       ca: 'Col-leccionisme',      uk: 'Колекціонування',         ru: 'Коллекционирование' },
    agro:        { es: 'Agricultura',        en: 'Agriculture',        ca: 'Agricultura',          uk: 'Сільське господарство',   ru: 'Сельское хозяйство' },
    gratis:      { es: 'Regalo',             en: 'Free stuff',         ca: 'De franc',             uk: 'Безкоштовно',             ru: 'Даром' },
    alquiler:    { es: 'Alquiler',           en: 'Rental',             ca: 'Lloguer',              uk: 'Оренда',                  ru: 'Аренда' },
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
