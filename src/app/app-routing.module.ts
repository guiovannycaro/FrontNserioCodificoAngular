import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ShippersComponent } from './pages/shippers/shippers.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SalesDatePredictionViewComponent } from './pages/sales-date-prediction-view/sales-date-prediction-view.component';

const routes: Routes = [

  { path: '', redirectTo: '/predictionview', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'dashboard/employees', component: EmployeesComponent },
  { path: 'dashboard/categoris', component: CategoriesComponent },
  { path: 'dashboard/products', component: ProductsComponent },
  { path: 'dashboard/suppliers', component: SuppliersComponent },
  { path: 'dashboard/customers', component: CustomersComponent },
  { path: 'dashboard/shippers', component: ShippersComponent },

  { path: 'dashboard/orders', component: OrdersComponent },

  { path: 'predictionview', component:SalesDatePredictionViewComponent},

  { path: '**', component: NopageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
