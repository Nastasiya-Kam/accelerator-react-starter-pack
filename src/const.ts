const RATING: number[] = [ 1, 2, 3, 4, 5 ];
const STRINGS_COUNT: number[] = [ 4, 6, 7, 12 ];
const TYPE_GUITARS: string[] = [ 'Акустические гитары', 'Электрогитары', 'Укулеле' ];
const PAGINATIONS: string[] = [ '1', '2', '3' ];

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

enum AppRoute {
  Root = '/',
}

enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/guitars/:id/comments',
  NewComment = '/comments',
  Coupon = '/coupons',
  Order = '/orders',
}

export {
  RATING,
  STRINGS_COUNT,
  TYPE_GUITARS,
  PAGINATIONS,
  Menu,
  socials,
  AppRoute,
  APIRoute
};
