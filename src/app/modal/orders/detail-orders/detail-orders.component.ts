import { AfterViewInit,Component, Inject,OnInit , ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DetailsOrders } from '../../../modelos/detailsorders';
import { OrderdetailsService } from '../../../servers/orderdetails.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-detail-orders',
  standalone: false,
  templateUrl: './detail-orders.component.html',
  styleUrl: './detail-orders.component.css'
})
export class DetailOrdersComponent implements AfterViewInit,OnInit{



  displayedColumns: string[] = ['id', 'companyname','contactname','productname','unitprice','qty','discount'];

  dataSource = new MatTableDataSource<DetailsOrders>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


    orderDetailsForm!: FormGroup;
    orderDetails : DetailsOrders= new  DetailsOrders();
    orderDetailssar: DetailsOrders [] =[];


     constructor(
          private fb: FormBuilder,
          private api: OrderdetailsService,
          public dialogRef: MatDialogRef<DetailOrdersComponent>,
          private cdr: ChangeDetectorRef,
          private routera: ActivatedRoute,
          private router: Router,
          @Inject(MAT_DIALOG_DATA) public data: any
        ) {
          console.log('Datos recibidos en el modal:', this.data);

          this.orderDetailsForm = this.fb.group({
            orderid: [0, Validators.required],
            companyname: ['', Validators.required],
            contactname: ['', Validators.required],
            productname:['', Validators.required],
            unitprice:[0, Validators.required],
            qty:[0, Validators.required],
            discount:[0, Validators.required]
          });
        }



        ngOnInit(): void {

          this.orderDetailsForm.patchValue(this.data);

          const id = Number(this.data?.are_idcarea);
            console.log('envio parametros al update ',this.data);
            console.log('numero envio ',id);
              this.obtDetalleOrdenById(id);


        }


        obtDetalleOrdenById(id: number) {
          if (!id || isNaN(id)) {
            console.error('ID no válido:', id);
            return;
          }

          console.log('🔹 Enviando ID a la API:', id);

          this.api.getDetailOrderById(id).subscribe({
            next: (response) => {
              console.log(' Respuesta de la API:', response);
               this.orderDetailssar = response;

               this.dataSource = new MatTableDataSource(response);
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;
            },
            error: (err) => {
              console.error(' Error obteniendo área:', err);
            }
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
