import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { MealType } from 'shared/models/mealType';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MealTypeService {

  constructor(private db: AngularFireDatabase) { }

  

  getAllMealTypes() {
    return this.db.list('/mealType');
  }

  getMealTypeById(orderId: string) {
    return this.db.object('/mealType/' + orderId);
  }

   getSelectedMealType(): Observable<MealType> {
    let cartId = localStorage.getItem('mealTypeId');
    if (cartId) return this.getMealTypeById(cartId);
    return null;
  }

}
