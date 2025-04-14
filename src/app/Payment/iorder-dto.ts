export interface IOrderDTO {
    orderId: number;
    orderStatus: string;
    orderDate: string;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    paymentIntentId: string;
    items: OrderItemDTO[];
  }
  
  export interface OrderItemDTO {
    productName: string;
    productImageUrl: string;
    quantity: number;
    unitPrice: number;
  }
