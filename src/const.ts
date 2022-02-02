const RATING = [ 1, 2, 3, 4, 5 ];
const HEADER_MENUS = [ 'Каталог', 'Где купить?', 'О компании' ];
const FOOTER_MENUS = [ 'Где купить?', 'Блог', 'Вопрос - ответ', 'Возврат', 'Сервис-центры' ];

const socials = [
  {
    name: 'facebook',
    href: 'https://www.facebook.com/',
    linkHref: '#icon-facebook',
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/',
    linkHref: '#icon-instagram',
  },
  {
    name: 'twitter',
    href: 'https://www.twitter.com/',
    linkHref: '#icon-twitter',
  },
];

const enum ErrorMessage {
  MinPrice = 'Цена не может быть нулевой или меньше минимального значения',
  MaxPrice = 'Цена не может быть больше максимального значения',
  LoadData = 'Загрузить данные не удалось',
  LoadCommentsData = 'Загрузить комментарии не удалось',
}

const ratingSize = {
  catalog: {
    width: 12,
    height: 11,
  },
  item: {
    width: 14,
    height: 14,
  },
  review: {
    width: 16,
    height: 16,
  },
};

const guitarType = {
  acoustic: {
    name: 'acoustic',
    type:  'Акустические гитары',
  },
  electric: {
    name: 'electric',
    type: 'Электрогитары',
  },
  ukulele: {
    name: 'ukulele',
    type: 'Укулеле',
  },
};

const enum ScreenTab {
  Characteristics = 'characteristics',
  Description = 'description',
}

//* НАВИГАЦИЯ *//

const enum AppRoute {
  Root = '/',
  CatalogPage = '/catalog/:page',
  GuitarPage = '/guitar/:id',
}

const enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/guitars/:id/comments',
  NewComment = '/comments',
  Coupon = '/coupons',
  Order = '/orders',
}

const enum ReplacedPart {
  Page = ':page',
  PartPage = 'page_',
  GuitarId = ':id',
}

//* ФИЛЬТР *//

const STRINGS = [ 4, 6, 7, 12 ];
const TYPE_GUITAR_NAMES = [ 'acoustic', 'electric', 'ukulele' ];
const TYPES_COUNT = 3;
const STRINGS_COUNT = 4;
const NOT_VALID_PRICE = 0;

const priceFilter = {
  priceMin: {
    id: 'priceMin',
    name: 'от',
  },
  priceMax: {
    id: 'priceMax',
    name: 'до',
  },
};

const TYPE_GUITARS = [
  {
    name: 'acoustic',
    type: 'Акустические гитары',
    stringsCount: [ 6, 7, 12 ],
  },
  {
    name: 'electric',
    type: 'Электрогитары',
    stringsCount: [ 4, 6, 7 ],
  },
  {
    name: 'ukulele',
    type: 'Укулеле',
    stringsCount: [ 4 ],
  },
];

const enum Param {
  Sort = 'sort',
  Order = 'order',
}

const enum Sort {
  Price = 'price',
  Rating = 'rating',
}

const enum Order {
  Desc = 'desc',
  Asc = 'asc'
}

const enum Filter {
  Start = '_start',
  End = '_end',
  PriceGte = 'price_gte',
  PriceLte = 'price_lte',
  Type = 'type',
  StringCount = 'stringCount',
  NameLike = 'name_like',
  SortingType = 'sort',
  OrderingType = 'order',
}

//* ПАГИНАЦИЯ *//

const DEFAULT_PAGE = 1;
const PAGINATION_STEP = 3;
const ELEMENT_ON_PAGE_COUNT = 9;

const enum PaginationPage {
  First = 0,
  Last = 3,
}

export {
  RATING,
  HEADER_MENUS,
  FOOTER_MENUS,
  socials,
  ErrorMessage,
  ratingSize,
  guitarType,
  ScreenTab,
  AppRoute,
  APIRoute,
  ReplacedPart,
  STRINGS,
  TYPE_GUITAR_NAMES,
  TYPES_COUNT,
  STRINGS_COUNT,
  NOT_VALID_PRICE,
  priceFilter,
  TYPE_GUITARS,
  Param,
  Sort,
  Order,
  Filter,
  DEFAULT_PAGE,
  PAGINATION_STEP,
  ELEMENT_ON_PAGE_COUNT,
  PaginationPage
};
