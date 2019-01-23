import { MealSize } from "./mealSize";

export class MealPlan {
    $key: string;
    title: string; 
    mealPlanCategory:string;       
    mealPlanOptions:Array<MealSize>;
    mealQuantity:Array<Number>;
  }
  