import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { MealPlan } from 'shared/models/mealPlan';
import { Observable } from 'rxjs/Observable';
import { MealSize } from 'shared/models/mealSize';

@Injectable()
export class MealPlanService {

  constructor(private db: AngularFireDatabase) { }

  

  getAllMealPlans() {
    //return this.db.list('/mealType');
    return [
      {
        $key: 1,
      title: 'LoseWeightMealPlan',  
      category: 'loseWeight', // fit, bulk    
      mealSize: [
      {
        mealSize:650,//ml
        pricePerMeal:12
      },
      {
        mealSize:450,//ml
        pricePerMeal:8
      },
      {
        mealSize:850,//ml
        pricePerMeal:16
      }

    ],
    selectedQuantity: 0,//[12, 18, 24]
    selectedPricePerMeal:0,
    selectedMealSize:0
      },
      {
        $key: 2,
      title: 'GainMuscleMealPlan',  
      category: 'GainWeight', // fit, bulk    
      mealSize: [
      {
        mealSize:650,//ml
        pricePerMeal:12
      },
      {
        mealSize:450,//ml
        pricePerMeal:8
      },
      {
        mealSize:850,//ml
        pricePerMeal:16
      }
      
    ],
    selectedMealSize:0,
    selectedPricePerMeal:0,    
    selectedQuantity: 0//[12, 18, 24]
      },
    ];
  }

  getMealPlanById(orderId: string) {
    return this.db.object('/mealType/' + orderId);
  }

   getSelectedMealPlan(): Observable<MealPlan> {
    let cartId = localStorage.getItem('mealPlanId');
    if (cartId) return this.getMealPlanById(cartId);
    return null;
  }

}
