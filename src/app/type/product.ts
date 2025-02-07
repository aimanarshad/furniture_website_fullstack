export type Product = {
  _id: string;
  id: number;

  title: string;
  description: string;
  price: number;
  productImage: string;
  tags: string[];
  dicountPercentage: number;
  isNew: boolean;
};
