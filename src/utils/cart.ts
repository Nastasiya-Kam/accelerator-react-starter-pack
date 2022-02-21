import { GuitarsCart } from '../types/guitars';

const getCartSumm = (guitars: GuitarsCart): number => guitars.reduce((previousValue, currentValue) => previousValue + (currentValue.price * currentValue.count), 0);

const getUniqueGuitars = (guitars: GuitarsCart): GuitarsCart => {
  const uniqueArray: GuitarsCart = [];

  guitars.forEach((guitar) => {
    if (!uniqueArray.some((element) => guitar.id === element.id)) {
      uniqueArray.push(guitar);
    }
  });

  return uniqueArray;
};

const getCountOfGuitarId = (uniqueGuitars: GuitarsCart, guitars: GuitarsCart) => {
  const data = uniqueGuitars.map((uniqueGuitar) => {
    const typeGuitar = {
      id: uniqueGuitar.id,
      count: 0,
    };

    guitars.map((guitar) => {
      if (guitar.id === typeGuitar.id) {
        typeGuitar.count += 1;
      }
    });

    return typeGuitar;
  });

  return data;
};

export {
  getCartSumm,
  getUniqueGuitars,
  getCountOfGuitarId
};
