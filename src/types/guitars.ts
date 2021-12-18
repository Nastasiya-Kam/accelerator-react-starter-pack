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
}

type Guitars = Guitar[];

export type { GuitarId, Guitar, Guitars };
