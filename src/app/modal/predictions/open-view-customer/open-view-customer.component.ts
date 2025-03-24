import { AfterViewInit, Component, Inject,OnInit, ViewChild  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Employees } from '../../../modelos/employees';
import { EmployeesService } from '../../../servers/employees.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Orders } from '../../../modelos/orders';
import { OrdersService } from '../../../servers/orders.service';
import { DetailOrdersComponent } from '../../../modal/orders/detail-orders/detail-orders.component';
import { AddordersComponent } from '../../../modal/orders/addorders/addorders.component';
import { EditordersComponent } from '../../../modal/orders/editorders/editorders.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-open-view-customer',
  standalone: false,
  templateUrl: './open-view-customer.component.html',
  styleUrl: './open-view-customer.component.css'
})
export class OpenViewCustomerComponent implements AfterViewInit,OnInit{

  displayedColumns: string[] = ['id', 'custid','empid','orderdate','requireddate','shippeddate','shipperid','freight',
    'shipname','shipaddress','shipcity','shipregion','shippostalcode','shipcountry','Acciones'];

    dataSource = new MatTableDataSource<Orders>();


    orderForm!: FormGroup;
 orders : Orders= new  Orders();
   orderssar: Orders [] =[];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(
      private fb: FormBuilder,
      private api: OrdersService,
      public dialogRef: MatDialogRef<OpenViewCustomerComponent>,
      private cdr: ChangeDetectorRef,
      private routera: ActivatedRoute,
      private router: Router,
      public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any
    ){

      this.orderForm = this.fb.group({
        orderid: [0, Validators.required],
        custid: [0, Validators.required],
        empid: [0, Validators.required],
        orderdate: [new Date(), Validators.required],
        requireddate: [new Date(), Validators.required],
        shippeddate: [new Date(), Validators.required],
        shipperid: [0, Validators.required],
        freight: ['', Validators.required],
        shipname: ['', Validators.required],
        shipaddress: ['', Validators.required],
        shipcity: ['', Validators.required],
        shipregion: ['', Validators.required],
        shippostalcode: ['', Validators.required],
        shipcountry: ['', Validators.required]
      });


  }

  ngOnInit(): void {

    this.orderForm.patchValue(this.data);

    const id = Number(this.data?.are_idcarea);
      console.log('envio parametros al update ',this.data);
      console.log('numero envio ',id);

    this.obtOrdersCustomersById(id);
  }



  obtOrdersCustomersById(id: number) {
    if (!id || isNaN(id)) {
      console.error('ID no válido:', id);
      return;
    }

    console.log('🔹 Enviando ID a la API:', id);

    this.api.getOrdersCustomerList(id).subscribe({
      next: (response) => {
        console.log(' Respuesta de la API:', response);

         console.log("Datos recibidos del backend:", response);
         this.dataSource = new MatTableDataSource(response);
         this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;

      },
      error: (err) => {
        console.error(' Error obteniendo área:', err);
      }
    });
  }


  openAddProForm() {
  this.dialog.open(AddordersComponent);

  }


  openEditProForm(id: number) {
  if (!id) {
    console.error("Error: ID es undefined o null");
    return;
  }

  this.dialog.open(EditordersComponent, {
    data: { are_idcarea: id },
    width: '500px'
  });
  }

  openDetailProForm(id: number) {
    if (!id) {
      console.error("Error: ID es undefined o null");
      return;
    }

    this.dialog.open(DetailOrdersComponent, {
      data: { are_idcarea: id },
      width: '1200vw',  // O el tamaño que necesites
          minWidth: '900px'
    });


}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
  }

}

