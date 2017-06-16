import { DataStorageService } from './../shared/data-storage.service';
import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

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

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.notifyUpdate();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.notifyUpdate();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.notifyUpdate();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes.slice();
        this.notifyUpdate();
    }

    private notifyUpdate() {
        this.recipesChanged.next(this.recipes.slice());
    }
}
