import { Comments } from './comments';

type GuitarId = number;

type Guitar = {
  id: GuitarId,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments: Comments,
}

type Guitars = Guitar[];

type GuitarType = {
  name: string,
  type: string,
  stringsCount: number[],
}

type GuitarCart = {
  id: GuitarId,
  name: string,
  vendorCode: string,
  type: string,
  previewImg: string,
  stringCount: number,
  price: number,
  count: number,
}

type GuitarsCart = GuitarCart[];

export type { GuitarId, Guitar, Guitars, GuitarType, GuitarCart, GuitarsCart };
