import { toast } from 'react-toastify';
import { ELEMENT_ON_PAGE_COUNT, ErrorMessage, guitarType, NOT_VALID_PRICE } from '../const';
import { Comment } from '../types/comments';

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

const getGuitarType = (type: string): string => {
  switch (type) {
    case guitarType.acoustic.name:
      return guitarType.acoustic.type;
    case guitarType.electric.name:
      return guitarType.electric.type;
    case guitarType.ukulele.name:
      return guitarType.ukulele.type;
  }

  return type;
};

const sort = (commentA: Comment, commentB: Comment) => {
  const dateA = new Date(commentA.createAt).getTime();
  const dateB = new Date(commentB.createAt).getTime();

  return dateB - dateA;
};

const checkValidRating = (rating: number): boolean => (rating > 0);
const checkValidText = (text: string): boolean => (text !== '');

export {
  numberWithSpaces,
  checkMinPrice,
  checkMaxPrice,
  getIndex,
  getGuitarType,
  sort,
  checkValidRating,
  checkValidText
};
