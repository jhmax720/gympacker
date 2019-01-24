import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { IProduct } from '../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { MealPlanService } from 'shared/services/mealPlan.service';
import { MealPlan } from 'shared/models/mealPlan';
import { MealSize } from 'shared/models/mealSize';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase, private mtService: MealPlanService) { }

  async addToCart(product: IProduct) {
    this.updateItemQty(product, 1);
  }

  async updateSelectedMealPlan(mealPlan:MealPlan, mealSize: MealSize)
  {
    
    let cartId = await this.getOrCreateCartId();
    let cart$ = this.db.object('/shopping-cart/' + cartId);
    cart$.take(1).subscribe(x=>{
      cart$.update({                        
        selectedPricePerMeal: mealSize.pricePerMeal,
        selectedPlanCategory:mealPlan.mealPlanCategory,
        selectedPlan:mealPlan.title,
        selectedMealSize:mealSize.mealSize
      })
    });
    
  }

  async updateSelectedMealNumber(quantity:number)
  {
    
    let cartId = await this.getOrCreateCartId();
    let cart$ = this.db.object('/shopping-cart/' + cartId);
    cart$.take(1).subscribe(x=>{
      cart$.update({
        selectedQuantity:quantity
        
      })
    });
    
  }

  async removeFromCart(product) {
    this.updateItemQty(product, -1);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId)
      .map(cart => { 
        var aCart = new ShoppingCart(cart.items);
        aCart.selectedMealSize = cart.selectedMealSize;
        aCart.selectedPricePerMeal = cart.selectedPricePerMeal;
        aCart.selectedPlan = cart.selectedPlan;
        aCart.selectedPlanCategory = cart.selectedPlanCategory;
        aCart.selectedQuantity = cart.selectedQuantity;
        return aCart}
        );
    
    
  }

  async clearAllCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).remove();
  }

  private async updateItemQty(product: IProduct, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    item$.take(1).subscribe(item => {
      const updatedQty = (item.qty || 0) + change;

      if (updatedQty <= 0) {
        item$.remove();
      }
      else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          //price: product.price,
          qty: updatedQty,
          
        });
      }

    });
  }

  private createCartId() {
    return this.db.list('shopping-cart').push({
      dateTime: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cardId');
    if (cartId) return cartId;

    let cart = await this.createCartId();

    cartId = localStorage.getItem('cardId');
    if (cartId) return cartId;

    localStorage.setItem('cardId', cart.key);
    return cart.key;
  }

  private getItem(cartId, key) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + key);
  }

  async totalPrice()
  {
    var price: number;
    let cart$ = await this.getCart();
     cart$.subscribe(x=> price = x.selectedQuantity * x.selectedQuantity);
    return price;
  }

}
