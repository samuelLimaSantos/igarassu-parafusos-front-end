/* eslint-disable camelcase */

export interface IProduct {
  id: string;
  cod: string;
  created_at: string;
  updated_at: string;
  description: string;
  image_id: number;
  name: string;
  price_buy: string;
  price_sell: string;
  quantity: number;
  type: string;
  unity: string;
  category_id: ICategory;
}

export interface ICategory {
  id: number;
  title: string;
}
