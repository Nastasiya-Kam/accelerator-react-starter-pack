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

enum AppRoute {
  Root = '/',
  CatalogPage = 'catalog/:page',
}

enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/guitars/:id/comments',
  NewComment = '/comments',
  Coupon = '/coupons',
  Order = '/orders',
}

enum ReplacedPart {
  Page = ':page',
}

//* ФИЛЬТР *//

const STRINGS: number[] = [ 4, 6, 7, 12 ];
const TYPES_COUNT = 3;
const STRINGS_COUNT = 4;

enum PriceFilter {
  From = 'от',
  To = 'до',
}

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

//* ПАГИНАЦИЯ *//

const DEFAULT_PAGE = 1;
const PAGINATION_STEP = 3;

enum PaginationPage {
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
  PriceFilter,
  TYPE_GUITARS,
  DEFAULT_PAGE,
  PAGINATION_STEP,
  PaginationPage
};
