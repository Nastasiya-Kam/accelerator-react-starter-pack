import { toast } from 'react-toastify';
import { ErrorMessages, NOT_VALID_PRICE } from '../const';

const numberWithSpaces = (integerNumber: number): string => integerNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const checkMinPrice = (userPrice: number, minPrice: number, maxPrice: number, userMaxPrice: string): string => {
  let price = userPrice;

  if (price < minPrice || price === NOT_VALID_PRICE) {
    price = minPrice;
    toast.info(ErrorMessages.MinPrice);
  }

  if (price > maxPrice) {
    price = maxPrice;
    toast.info(ErrorMessages.MaxPrice);
  }

  if (userMaxPrice !== '') {
    const max = Number(userMaxPrice);

    if (price > max) {
      price = max;
      toast.info(ErrorMessages.MaxPrice);
    }
  }

  return String(price);
};

const checkMaxPrice = (userPrice: number, minPrice: number, maxPrice: number, userMinPrice: string): string => {
  let price = userPrice;

  if (price > maxPrice) {
    price = maxPrice;
    toast.info(ErrorMessages.MaxPrice);
  }

  if (price < minPrice || price === NOT_VALID_PRICE) {
    price = minPrice;
    toast.info(ErrorMessages.MinPrice);
  }

  if (userMinPrice !== '') {
    const min = Number(userMinPrice);

    if (price < min) {
      userPrice = min;
      toast.info(ErrorMessages.MaxPrice);
    }
  }

  return String(price);
};

export {
  numberWithSpaces,
  checkMinPrice,
  checkMaxPrice
};
