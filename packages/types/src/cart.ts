export interface CartItemType {
  productId: string;
  title: string;
  imageUrl: string;
  price: string;
  discountPrice: string;
  brand: string;
  quantity: number;
  currency: string;
}

export interface CartResponseType {
  items: CartItemType[];
  total?: number;
  subTotal?: number;
  taxes?: number;
  currency?: string;
  totalDiscount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  itemCount?: number;
}
