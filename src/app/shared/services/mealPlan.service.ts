import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { MealPlan } from 'shared/models/mealPlan';
import { Observable } from 'rxjs/Observable';
import { MealSize } from 'shared/models/mealSize';


@Injectable()
export class MealPlanService {

  constructor(private db: AngularFireDatabase) { }

  getMealChoiceNumber()
  {
    return [6,12,14,24];
  }

  getAllMealPlans() {
    return this.db.list('/mealplans');    
  }

  getMealPlanById(orderId: string) {
    return this.db.object('/mealType/' + orderId);
  }
     

}
