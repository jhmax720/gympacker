import { MealSize } from "./mealSize";

export class MealPlan {
    $key: string;
    title: string;    
    mealSizeKey:string; 
    mealPlanOptions:Array<MealSize>;
    selectedQuantity: number;
    selectedPricePerMeal: number;
  }
  