import { ShoppingCart } from './shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
export class Order {

  datePlaced: number;
  items: any[];
  netPrice: number;
  user: {
    username: string,
    userId: string
  };
  mealTypeId:string;
  isOneOff: boolean;


  constructor(userId, userName,
    public shipping: any, carts: ShoppingCart, private cartService: ShoppingCartService) {

    this.datePlaced = new Date().getTime();

    this.items = carts.items.map(item => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          // price: item.price
          size: item.size,
          category: item.category
        },
        qty: item.qty,
        //price: item.price,
        //totalPrice: item.totalPrice
      };
    });

    this.user = {
      userId: userId,
      username: userName
    };
    cartService.totalPrice().then(x=>this.netPrice = x);


  }
}
