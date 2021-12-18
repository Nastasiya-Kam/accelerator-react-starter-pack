import { GuitarId } from './guitars';

type Comment = {
  id: string,
  userName: string,
  advantages: string,
  disadvantages: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

type CommentPost = {
  guitarId: GuitarId,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}

type CouponPost = {
  coupon: string,
}

type OrderPost = {
  guitarsIds: number[],
  coupon: string,
}

export type {
  Comment,
  CommentPost,
  CouponPost,
  OrderPost
};
