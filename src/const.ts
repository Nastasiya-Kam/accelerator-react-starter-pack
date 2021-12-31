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

//* НАВИГАЦИЯ *//

const enum AppRoute {
  Root = '/',
  CatalogPage = 'catalog/:page',
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

const enum Params {
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

//* ПАГИНАЦИЯ *//

const DEFAULT_PAGE = 1;
const PAGINATION_STEP = 3;

const enum PaginationPage {
  First = 0,
  Last = 3,
}

export {
  RATING,
  Menu,
  socials,
  AppRoute,
  APIRoute,
  ReplacedPart,
  STRINGS,
  TYPES_COUNT,
  STRINGS_COUNT,
  NOT_VALID_PRICE,
  PriceFilter,
  TYPE_GUITARS,
  DEFAULT_PAGE,
  PAGINATION_STEP,
  PaginationPage,
  Params,
  Sort,
  Order
};
