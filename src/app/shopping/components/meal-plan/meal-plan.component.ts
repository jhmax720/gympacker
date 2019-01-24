import { Component, OnInit } from '@angular/core';
import { MealPlanService } from 'shared/services/mealPlan.service';
import { MealPlan } from 'shared/models/mealPlan';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {

  plans: MealPlan[] = [];
  

  constructor(
    private mpService: MealPlanService,
    private cartService: ShoppingCartService
     ) { }

  ngOnInit() {
    this.mpService.getAllMealPlans().subscribe(x=> {
        this.plans = x;
    });


  }

  getMealNumberOptions()
  {
    return this.mpService.getMealChoiceNumber();
  }

  setMealWeeklyNumber(quantity)
  {
    this.cartService.updateSelectedMealNumber(quantity);
  }

  setMealPlanSelected(mealPlan, mealSize)
  {
    this.cartService.updateSelectedMealPlan(mealPlan, mealSize);

  }

}
