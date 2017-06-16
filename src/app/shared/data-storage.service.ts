import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth/auth-service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Http, Response } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';

const baseUrl = 'https://ng-recipe-book-2c9e0.firebaseio.com/';
const recipesUrl = baseUrl + '/recipes.json';

import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    subscription: Subscription;

    constructor(private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService) {
        this.subscription = this.authService.tokenChanged.subscribe(
            (token: string) => {
                console.log('New token: ' + token);
                this.loadRecipes();
            }
        );
        console.log('Token subscription setup on data service');
    }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put(recipesUrl + '?auth=' + token, this.recipeService.getRecipes());
    }

    loadRecipes() {
        const token = this.authService.getToken();

        this.http.get(recipesUrl + '?auth=' + token)
            .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (const recipe of recipes) {
                    // empty array could not be set by backend service, force creation
                    if (!recipe['ingredients']) {
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
