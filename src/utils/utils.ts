import { toast } from 'react-toastify';
import { ELEMENT_ON_PAGE_COUNT, ErrorMessage, NOT_VALID_PRICE } from '../const';

const numberWithSpaces = (integerNumber: number): string => integerNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const checkMinPrice = (userPrice: number, minPrice: number, maxPrice: number, userMaxPrice: string): string => {
  let price = userPrice;

  if (price < minPrice || price === NOT_VALID_PRICE) {
    price = minPrice;
    toast.info(ErrorMessage.MinPrice);
  }

  if (price > maxPrice) {
    price = maxPrice;
    toast.info(ErrorMessage.MaxPrice);
  }

  if (userMaxPrice !== '') {
    const max = Number(userMaxPrice);

    if (price > max) {
      price = max;
      toast.info(ErrorMessage.MaxPrice);
    }
  }

  return String(price);
};

const checkMaxPrice = (userPrice: number, minPrice: number, maxPrice: number, userMinPrice: string): string => {
  let price = userPrice;

  if (price > maxPrice) {
    price = maxPrice;
    toast.info(ErrorMessage.MaxPrice);
  }

  if (price < minPrice || price === NOT_VALID_PRICE) {
    price = minPrice;
    toast.info(ErrorMessage.MinPrice);
  }

  if (userMinPrice !== '') {
    const min = Number(userMinPrice);

    if (price < min) {
      price = min;
      toast.info(ErrorMessage.MaxPrice);
    }
  }

  return String(price);
};

const getIndex = (page: number) => ({
  lastIndex: page * ELEMENT_ON_PAGE_COUNT,
  startIndex: page * ELEMENT_ON_PAGE_COUNT - ELEMENT_ON_PAGE_COUNT,
});

export {
  numberWithSpaces,
  checkMinPrice,
  checkMaxPrice,
  getIndex
};
