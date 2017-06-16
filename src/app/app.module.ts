import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing-module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import {AppComponent} from './app.component';
import {ShoppingListModule} from './shopping-list/shopping-list.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
