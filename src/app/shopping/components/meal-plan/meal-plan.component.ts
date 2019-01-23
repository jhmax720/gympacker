import { Component, OnInit } from '@angular/core';
import { MealPlanService } from 'shared/services/mealPlan.service';
import { MealPlan } from 'shared/models/mealPlan';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {

  plans: MealPlan[] = [];
  

  constructor(private mpService: MealPlanService ) { }

  ngOnInit() {
    this.mpService.getAllMealPlans().subscribe(x=> {
        this.plans = x;
    });
  }

  getMealNumberOptions()
  {
    return this.mpService.getMealChoiceNumber();
  }

  setMealWeeklyNumber(choice)
  {
    
  }

}
