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
  createdAt?: string;
  updatedAt?: string;
  itemCount?: number;
}

export interface OrderResponseType extends CartResponseType {
  orderId?: string;
  orderStatus: string;
  shippingAddress: string;
  shippingType: string;
  paymentStatus: string;
  paymentType: string;
}
