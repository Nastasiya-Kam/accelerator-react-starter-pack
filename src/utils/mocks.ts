import { Guitar, GuitarCart, Guitars, GuitarsCart } from '../types/guitars';
import { image, music, name } from 'faker';
import { Comment, Comments } from '../types/comments';

enum Count {
  GuitarsTest = 4,
}

enum HttpCode {
  Ok = 200,
  PostOk = 201,
  NoContent = 204,
  NotFound = 404,
}

const makeFakeGuitar = (): Guitar => ({
  'id': Math.floor(Math.random() * 100000),
  'name': name.firstName(),
  'vendorCode': 'SO757575',
  'type': music.genre(),
  'description': 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  'previewImg': image.image(),
  'stringCount': 7,
  'rating': 4,
  'price': 17500,
} as Guitar);

const makeFakeGuitars = (): Guitars => new Array(Count.GuitarsTest).fill(undefined).map(() => makeFakeGuitar());

const makeFakeComment = (): Comment => ({
  id: String(Math.floor(Math.random() * 100000)),
  userName: name.firstName(),
  advantage: 'очень хорошо',
  disadvantage: 'очень плохо',
  comment: 'длинный комментарий',
  rating: 4,
  createAt: '2021-10-28T12:32:16.934Z',
  guitarId: 1,
} as Comment);

const makeFakeComments = (commentsCount: number): Comments => new Array(commentsCount).fill(undefined).map(() => makeFakeComment());

const makeFakeGuitarCart = (): GuitarCart => ({
  'id': Math.floor(Math.random() * 100000),
  'name': name.firstName(),
  'vendorCode': 'SO757575',
  'type': music.genre(),
  'description': 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  'previewImg': image.image(),
  'stringCount': 7,
  'price': 17500,
  'count': 1,
} as GuitarCart);

const makeFakeGuitarsCart = (guitarsCartCount: number): GuitarsCart => new Array(guitarsCartCount).fill(undefined).map(() => makeFakeGuitarCart());

export {
  HttpCode,
  makeFakeGuitar,
  makeFakeGuitars,
  makeFakeComment,
  makeFakeComments,
  makeFakeGuitarCart,
  makeFakeGuitarsCart
};
