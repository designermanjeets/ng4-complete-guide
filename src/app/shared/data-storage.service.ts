import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://ng-recipe-book-2c9e0.firebaseio.com/';
const recipesUrl = baseUrl + '/recipes.json';

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) { }

    storeRecipes() {
        return this.http.put(recipesUrl, this.recipeService.getRecipes());
    }

    loadRecipes() {
        this.http.get(recipesUrl)
            .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        console.log(recipe);
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
              }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}