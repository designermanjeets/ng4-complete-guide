import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'This is a test recipe',
            'http://recettes-de-chefs.ca/images/archives/les_recettes_david_biron/main/00_Beauty_Shot_Cotelettes-large.jpg'),
        new Recipe('Another test recipe', 'This is a test recipe',
            'http://recettes-de-chefs.ca/images/archives/les_recettes_david_biron/main/00_Beauty_Shot_Cotelettes-large.jpg')
    ];

    getRecipes() {
        // defensive copy
        return this.recipes.slice();
    }
}
