export type TVariant = {
  type: string;
  value: string;
};

export type TInvetory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInvetory;
};
