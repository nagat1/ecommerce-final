export  interface ordercash {
      taxPrice: number;
      shippingPrice: number;
      totalOrderPrice: number;
      paymentMethodType: string;
      isPaid: boolean;
      isDelivered: boolean;
      _id: string;
      user: string;
    //   cartItems: CartItem[];
      createdAt: string;
      updatedAt: string;
      id: number;
      __v: number;
    }
    export interface CartItemcash {
      count: number;
      _id: string;
    //   product: Product;
      price: number;
    }
