import { IProduct } from './product';
import { ShoppingCartItem } from './shopping-cart-items';
import { MealPlan } from 'shared/models/mealPlan';
import { MealPlanService } from 'shared/services/mealPlan.service';

export class ShoppingCart {

  items: ShoppingCartItem[] = [];
  selectedQuantity: number;
  selectedPricePerMeal: number;
  selectedPlanCategory:string;
  selectedPlan:string;
  selectedMealSize:string;

  constructor(private itemsMap: { [key: string]: ShoppingCartItem}) {
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({
        ...item,
        $key: productId,
      }));
      
    }

  }

  getQty(product: IProduct) {
    let item = this.itemsMap[product.$key];
    return item ? item.qty : 0;
  }


  get totalItemCount(): number {
    let count = 0;
    this.items.forEach(item => {
      count += item.qty;
    });
    return count;
  }

  get totalPrice() {
    // let count = 0;
    // this.items.forEach(item => {
    //   count += item.totalPrice;
    // });
    var price : number;

    
    price = this.selectedPricePerMeal * this.selectedQuantity ;
    return price;

    //return count;
  }

}

