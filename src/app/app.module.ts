import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule,FormsModule} from  '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';



import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShippersComponent } from './pages/shippers/shippers.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { AddcategoriesComponent } from './modal/categories/addcategories/addcategories.component';
import { EditcategoriesComponent } from './modal/categories/editcategories/editcategories.component';
import { EditcustomersComponent } from './modal/customers/editcustomers/editcustomers.component';
import { AddcustomersComponent } from './modal/customers/addcustomers/addcustomers.component';
import { AddemployeesComponent } from './modal/employees/addemployees/addemployees.component';
import { EditemployeesComponent } from './modal/employees/editemployees/editemployees.component';
import { EditordersComponent } from './modal/orders/editorders/editorders.component';
import { AddordersComponent } from './modal/orders/addorders/addorders.component';
import { EditproductsComponent } from './modal/products/editproducts/editproducts.component';
import { AddproductsComponent } from './modal/products/addproducts/addproducts.component';
import { EditshippersComponent } from './modal/shippers/editshippers/editshippers.component';
import { AddshippersComponent } from './modal/shippers/addshippers/addshippers.component';
import { AddsuppliersComponent } from './modal/suppliers/addsuppliers/addsuppliers.component';
import { EdituppliersComponent } from './modal/suppliers/edituppliers/edituppliers.component';
import { DetailOrdersComponent } from './modal/orders/detail-orders/detail-orders.component';
import { SalesDatePredictionViewComponent } from './pages/sales-date-prediction-view/sales-date-prediction-view.component';
import { OpenViewCustomerComponent } from './modal/predictions/open-view-customer/open-view-customer.component';
import { AddNewPredictionComponent } from './modal/predictions/add-new-prediction/add-new-prediction.component';



@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    NopageFoundComponent,
    CategoriesComponent,
    CustomersComponent,
    DashboardComponent,
    EmployeesComponent,
    OrdersComponent,
    ProductsComponent,
    ShippersComponent,
    SuppliersComponent,
    AddcategoriesComponent,
    EditcategoriesComponent,
    EditcustomersComponent,
    AddcustomersComponent,
    AddemployeesComponent,
    EditemployeesComponent,
    EditordersComponent,
    AddordersComponent,
    EditproductsComponent,
    AddproductsComponent,
    EditshippersComponent,
    AddshippersComponent,
    AddsuppliersComponent,
    EdituppliersComponent,
    DetailOrdersComponent,
    SalesDatePredictionViewComponent,
    OpenViewCustomerComponent,
    AddNewPredictionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    NgxPaginationModule,
    BrowserAnimationsModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
