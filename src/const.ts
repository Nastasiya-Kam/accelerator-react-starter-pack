const RATING: number[] = [ 1, 2, 3, 4, 5 ];

const Menu = {
  Main: [
    'Каталог',
    'Где купить?',
    'О компании',
  ],
  Footer: [
    'Где купить?',
    'Блог',
    'Вопрос - ответ',
    'Возврат',
    'Сервис-центры',
  ],
};

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
}

//* НАВИГАЦИЯ *//

const enum AppRoute {
  Root = '/',
  CatalogPage = '/catalog/:page',
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
}

//* ФИЛЬТР *//

const STRINGS: number[] = [ 4, 6, 7, 12 ];
const TYPES_COUNT = 3;
const STRINGS_COUNT = 4;
const NOT_VALID_PRICE = 0;

const PriceFilter = {
  PRICE_MIN: {
    id: 'priceMin',
    name: 'от',
  },
  PRICE_MAX: {
    id: 'priceMax',
    name: 'от',
  },
};

const TypeOfGuitar = {
  ACOUSTIC: {
    name: 'acoustic',
    type: 'Акустические гитары',
    stringsCount: [ 6, 7, 12 ],
  },
  ELECTRIC: {
    name: 'electric',
    type: 'Электрогитары',
    stringsCount: [ 4, 6, 7 ],
  },
  UKULELE: {
    name: 'ukulele',
    type: 'Укулеле',
    stringsCount: [ 4 ],
  },
};

const TYPE_GUITARS = [ TypeOfGuitar.ACOUSTIC, TypeOfGuitar.ELECTRIC, TypeOfGuitar.UKULELE ];

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
  Start = 'start',
  End = 'end',
  PriceGte = 'price_gte',
  PriceLte = 'price_lte',
  Type = 'type',
  StringCount = 'stringCount',
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
  Menu,
  socials,
  ErrorMessage,
  AppRoute,
  APIRoute,
  ReplacedPart,
  STRINGS,
  TYPES_COUNT,
  STRINGS_COUNT,
  NOT_VALID_PRICE,
  PriceFilter,
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
