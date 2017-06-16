import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({ transform: 'translateX(-50%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(50%)',
          backgroundColor: 'red'
        }))
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
