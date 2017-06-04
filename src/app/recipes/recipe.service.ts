import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Paté gaumais', 'Paté gaumais - description',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/P%C3%A2t%C3%A9_gaumois_familial.jpg/280px-P%C3%A2t%C3%A9_gaumois_familial.jpg',
            [new Ingredient('ingredient 1', 5),
            new Ingredient('ingredient 2', 42)]),
        new Recipe('Touffaye', 'Touffaye - description',
            'https://ds1.static.rtbf.be/article/image/624x351/7/9/3/9dc372713683fd865d366d5d9ee810ba-1397820935.jpg',
            [new Ingredient('ingredient 3', 7)])
    ];

    constructor(private slService: ShoppingListService) {
    }


    getRecipes() {
        // defensive copy
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }
}
