/**
 * Russian translations for the existing public content, used by the i18n
 * backfill seeder. English stays authoritative in the entity columns; these
 * values populate each row's `i18n.ru` override.
 */

/** Repeated short phrases (inclusions / exclusions / highlights) — translated
 *  once and reused across every tour. Anything not listed falls back to EN. */
export const PHRASES: Record<string, string> = {
  // Included
  'Airport pickup on arrival': 'Встреча в аэропорту по прилёте',
  'Airport drop-off on departure': 'Трансфер в аэропорт при вылете',
  'Bottled water': 'Бутилированная вода',
  'Boutique accommodation each night': 'Проживание в бутик-отелях каждую ночь',
  'Comfortable private vehicle': 'Комфортабельный частный автомобиль',
  'Drone photography (weather permitting)': 'Съёмка с дрона (при хорошей погоде)',
  'English-speaking driver-guide': 'Англоговорящий водитель-гид',
  Fuel: 'Топливо',
  'Hotel pick-up & drop-off': 'Трансфер от отеля и обратно',
  'Parking fees': 'Оплата парковки',
  'Private English-speaking guide': 'Частный англоговорящий гид',
  'Private air-conditioned vehicle': 'Частный автомобиль с кондиционером',
  'Private comfortable vehicle': 'Частный комфортабельный автомобиль',
  'Traditional Georgian lunch': 'Традиционный грузинский обед',
  'Wine tasting at a family cellar': 'Дегустация вина в семейном погребе',
  // Excluded
  Accommodation: 'Проживание',
  'Entrance fees': 'Входные билеты',
  'Lunch & dinner': 'Обед и ужин',
  Meals: 'Питание',
  'Optional activities (zip line, ATV, boat ride, cable car)':
    'Дополнительные активности (зип-лайн, квадроциклы, прогулка на лодке, канатная дорога)',
  'Personal expenses': 'Личные расходы',
  // Highlights
  'Adjara adventure': 'Приключение в Аджарии',
  'Ananuri Fortress': 'Крепость Ананури',
  'Batumi & the Black Sea': 'Батуми и Чёрное море',
  'Batumi coast': 'Побережье Батуми',
  'Black & White Aragvi Rivers': 'Слияние Чёрной и Белой Арагви',
  'Boat ride (optional)': 'Прогулка на лодке (по желанию)',
  'Bodbe Monastery': 'Монастырь Бодбе',
  'Borjomi Central Park': 'Центральный парк Боржоми',
  'Borjomi National Park': 'Национальный парк Боржоми',
  'Bridge of Peace': 'Мост Мира',
  'Chronicle of Georgia': 'Монумент «Хроника Грузии»',
  'Churchkhela & cheese tasting': 'Дегустация чурчхелы и сыра',
  'Clock Tower': 'Часовая башня',
  'Comfortable air-conditioned vehicle': 'Комфортабельный автомобиль с кондиционером',
  'Dashbashi Canyon': 'Каньон Дашбаши',
  'Diamond Glass Bridge': 'Стеклянный мост «Бриллиант»',
  'English-speaking local driver-guide': 'Местный англоговорящий водитель-гид',
  'Flexible departure time': 'Гибкое время отправления',
  'Gergeti Trinity Church': 'Церковь Святой Троицы в Гергети',
  'Green Monastery': 'Зелёный монастырь',
  'Gudauri Panorama': 'Панорама Гудаури',
  'Holy Trinity Cathedral (Sameba)': 'Собор Святой Троицы (Самеба)',
  'Jvari & Svetitskhoveli': 'Джвари и Светицховели',
  'Jvari Monastery': 'Монастырь Джвари',
  'KTW Winery wine tasting': 'Дегустация вин на винодельне KTW',
  'Kakheti wine': 'Кахетинское вино',
  'Kakheti wine region': 'Винный регион Кахетия',
  'Kakheti wine region & wine tasting': 'Винный регион Кахетия и дегустация вина',
  'Kazbegi & Gergeti': 'Казбеги и Гергети',
  'Kazbegi & Gergeti Trinity Church': 'Казбеги и церковь Святой Троицы в Гергети',
  'Kazbegi peaks': 'Вершины Казбеги',
  'Martvili & Prometheus': 'Мартвили и пещера Прометея',
  'Martvili Canyon': 'Каньон Мартвили',
  'Mother of Georgia': 'Монумент «Мать Грузия»',
  Mtskheta: 'Мцхета',
  'Old Tbilisi': 'Старый Тбилиси',
  'Optional stops en route': 'Остановки по пути (по желанию)',
  'Private door-to-door transfer': 'Частный трансфер «от двери до двери»',
  'Private transportation throughout': 'Частный транспорт на протяжении всего тура',
  'Prometheus Cave': 'Пещера Прометея',
  'Prometheus Cave & Martvili Canyon': 'Пещера Прометея и каньон Мартвили',
  'Qvevri wine tasting': 'Дегустация вина из квеври',
  'Scenic drive through the Caucasus Mountains': 'Живописная дорога через Кавказские горы',
  'Scenic nature walks': 'Живописные прогулки на природе',
  'Shatili — 1 night': 'Шатили — 1 ночь',
  'Sighnaghi & Bodbe': 'Сигнахи и Бодбе',
  'Sighnaghi – City of Love': 'Сигнахи — город любви',
  'Stalin Museum': 'Музей Сталина',
  'Svetitskhoveli Cathedral': 'Собор Светицховели',
  'Tbilisi & Mtskheta': 'Тбилиси и Мцхета',
  'Tbilisi city tour': 'Обзорная экскурсия по Тбилиси',
  'Tbilisi old town': 'Старый город Тбилиси',
  'Tusheti — 2 nights': 'Тушетия — 2 ночи',
  'UNESCO World Heritage Sites': 'Объекты всемирного наследия ЮНЕСКО',
  'Uplistsikhe Cave Town': 'Пещерный город Уплисцихе',
  Waterfalls: 'Водопады',
  'Zhinvali Reservoir': 'Жинвальское водохранилище',
};

/** Per-tour unique text, keyed by slug. */
export const TOURS_RU: Record<string, { title: string; location: string; duration: string; overview: string }> = {
  'best-of-georgia-13-day': {
    title: 'Большое путешествие по Грузии — 13 дней',
    location: 'Тбилиси · Кахетия · Тушетия · Шатили · Казбеги · Кутаиси · Боржоми',
    duration: '13 дней / 12 ночей',
    overview:
      'Откройте для себя самое лучшее в Грузии в этом незабываемом тринадцатидневном путешествии. Вы увидите объекты всемирного наследия ЮНЕСКО, попробуете знаменитое грузинское вино, пройдётесь по очаровательным горным деревням и почувствуете нетронутую красоту Большого Кавказа. От оживлённых улиц Тбилиси до отдалённых районов Тушетии и Шатили — этот тур дарит идеальное сочетание культуры, истории, природы и приключений. Лучшее время для поездки — с июня по сентябрь, когда открыты высокогорные перевалы.',
  },
  'grand-georgia-7-day': {
    title: 'Гранд-тур по Грузии — 7 дней',
    location: 'Тбилиси · Кахетия · Кутаиси · Батуми · Казбеги',
    duration: '7 дней',
    overview:
      'Полное путешествие от моря до гор — винный край, западные каньоны, Чёрное море в Батуми и высокий Кавказ, и всё это с личным гидом.',
  },
  'tbilisi-batumi-private-transfer': {
    title: 'Частный трансфер Тбилиси — Батуми',
    location: 'Батуми',
    duration: '6 часов',
    overview:
      'Частный прямой трансфер из Тбилиси в Батуми на комфортабельном автомобиле с кондиционером. Дорога занимает около 6 часов, а поскольку машина в вашем полном распоряжении, вы можете выехать в удобное время и сделать остановки по пути.',
  },
  'wine-mountains-5-day': {
    title: 'Вино и горы — 5 дней',
    location: 'Тбилиси · Кахетия · Казбеги',
    duration: '5 дней',
    overview:
      'Два лица Грузии — янтарные винные погреба Кахетии и ледники Большого Кавказа, а между ними — столица.',
  },
  'kazbegi-day-tour': {
    title: 'Однодневный тур в Казбеги из Тбилиси',
    location: 'Казбеги',
    duration: '8–10 часов',
    overview:
      'Откройте для себя захватывающую красоту Военно-Грузинской дороги в этом частном однодневном туре в Казбеги. Вы посетите древние крепости, горные водохранилища, панорамные смотровые площадки и знаменитую церковь Святой Троицы в Гергети в окружении величественных Кавказских гор.',
  },
  'essential-georgia-3-day': {
    title: 'Знакомство с Грузией — 3 дня',
    location: 'Тбилиси · Мцхета · Казбеги',
    duration: '3 дня',
    overview:
      'Идеальные длинные выходные — старый город столицы, древние храмы Мцхеты и день в высоком Кавказе у Казбеги.',
  },
  'tbilisi-mtskheta-day-tour': {
    title: 'Однодневный тур в Тбилиси и Мцхету',
    location: 'Тбилиси',
    duration: '7–9 часов',
    overview:
      'Познакомьтесь со столицей Грузии и её древней столицей Мцхетой, где воедино сплетаются история, культура и религия.',
  },
  'georgia-highlights-tour': {
    title: 'Тур «Лучшее в Грузии»',
    location: 'Тбилиси · Кахетия · Казбеги · Батуми',
    duration: '8 дней / 7 ночей',
    overview:
      'Восьмидневное частное путешествие по Грузии с англоговорящим водителем-гидом: Тбилиси и древняя Мцхета, винный регион Кахетия, Кавказские горы вокруг Казбеги, приморский Батуми и Аджария, а также изумрудные каньоны запада страны.',
  },
  'kakheti-wine-day-tour': {
    title: 'Винный тур в Кахетию на день',
    location: 'Кахетия',
    duration: '8–10 часов',
    overview:
      'Познакомьтесь со знаменитым винным регионом Грузии, его богатой историей, вкусной местной кухней и прекрасными пейзажами.',
  },
  'martvili-prometheus-day-tour': {
    title: 'Каньон Мартвили и пещера Прометея — тур на день',
    location: 'Мартвили',
    duration: '10–12 часов (дальняя поездка)',
    overview:
      'Этот тур на дальнее расстояние идеально подходит для любителей природы и знакомит вас с самыми впечатляющими природными достопримечательностями Западной Грузии.',
  },
  'dashbashi-canyon-day-tour': {
    title: 'Однодневный тур в каньон Дашбаши',
    location: 'Дашбаши',
    duration: '6–8 часов',
    overview:
      'Посетите одну из новейших природных достопримечательностей Грузии, знаменитую впечатляющим каньоном и уникальным стеклянным мостом.',
  },
  'borjomi-day-tour': {
    title: 'Однодневный тур в Боржоми из Тбилиси',
    location: 'Боржоми',
    duration: '8–10 часов',
    overview:
      'Познакомьтесь с историей и природой Грузии: посетите родину Сталина, древний пещерный город Уплисцихе и знаменитый Национальный парк Боржоми.',
  },
};

/** Hero slides, keyed by the English `place`. */
export const HERO_RU: Record<string, { place: string; alt: string }> = {
  Kazbegi: { place: 'Казбеги', alt: 'Церковь Святой Троицы в Гергети на фоне снежных вершин Казбека' },
  Tbilisi: { place: 'Тбилиси', alt: 'Старый город Тбилиси вдоль реки Мтквари в сумерках' },
  Kakheti: { place: 'Кахетия', alt: 'Виноградники винного региона Кахетия у подножия Кавказа' },
  Caucasus: { place: 'Кавказ', alt: 'Зелёная долина в глубине Кавказских гор' },
  Batumi: { place: 'Батуми', alt: 'Побережье Чёрного моря и панорама Батуми на рассвете' },
};

/** Memories, keyed by the English `tourTitle`. */
export const MEMORIES_RU: Record<string, { tourTitle: string; caption: string }> = {
  'Kazbegi & Gergeti Trinity': {
    tourTitle: 'Казбеги и церковь Святой Троицы в Гергети',
    caption:
      'Встретили рассвет у Гергети, когда вокруг ещё никого не было. Полная тишина — только мы и горы.',
  },
  'Georgian Military Road': {
    tourTitle: 'Военно-Грузинская дорога',
    caption:
      'Дорога через Кавказ всю поездку была похожа на кино — за каждым поворотом открывалось что-то грандиознее.',
  },
  'Kakheti Wine Country': {
    tourTitle: 'Винный край Кахетии',
    caption:
      'Семейный погреб, метод квеври возрастом 8000 лет и лучший обед за всю поездку.',
  },
  'Tbilisi Old Town & Baths': {
    tourTitle: 'Старый город Тбилиси и серные бани',
    caption:
      'Балконы, переулки и серные бани — город покорил нас всего за один день.',
  },
  'Svaneti Highlands': {
    tourTitle: 'Высокогорье Сванетии',
    caption:
      'Средневековые каменные башни на фоне снежной линии. Больше нигде на земле нет ничего подобного.',
  },
  'Mtskheta Day Trip': {
    tourTitle: 'Поездка в Мцхету',
    caption:
      'Древняя столица, монастырь Джвари над слиянием рек и тёплые хозяева, принявшие нас как родных.',
  },
};
