export interface WishList {
        userId: string; 
        wishListId: number;
        withListDetails: WishListDetail[];
      }
      
      export interface WishListDetail {
        productId: number;
        productName: string;
        productImageUrl: string;
      }
      

