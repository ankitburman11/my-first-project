import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddSalesComponent } from "./components/add-sales/add-sales.component";
import { HomeComponent } from "./components/home/home.component";
import { LedgerComponent } from "./components/ledger/ledger.component";

const appRoutes: Routes = [
  {path: 'addSales', component: AddSalesComponent},
  {path: 'ledger', component: LedgerComponent},
  {path: 'home', component: HomeComponent},
  {path: '', pathMatch: 'full', redirectTo: '/home'},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}