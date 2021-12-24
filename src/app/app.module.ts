import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsDiamondComponent } from './components/home/forms-component/forms-diamond/forms-diamond.component';
import { FormsGoldComponent } from './components/home/forms-component/forms-gold/forms-gold.component';
import { FormsSilverComponent } from './components/home/forms-component/forms-silver/forms-silver.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { AppRoutingModule } from './app-routing.module';
import { UserDetailFormComponent } from './components/add-sales/user-detail-form/user-detail-form.component';
import { RateFormComponent } from './shared/rate-form/rate-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FormsDiamondComponent,
    FormsGoldComponent,
    FormsSilverComponent,
    AddSalesComponent,
    UserDetailFormComponent,
    RateFormComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
