import { Guitar, Guitars } from '../types/guitars';
import { image, music, name } from 'faker';

enum Count {
  GuitarsTest = 4,
  CommentsTest = 10,
}

enum HttpCode {
  Ok = 200,
  NoContent = 204,
  NoAuth = 401,
}

const makeFakeGuitar = (): Guitar => ({
  'id': 1,
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

export {
  HttpCode,
  makeFakeGuitar,
  makeFakeGuitars
};
