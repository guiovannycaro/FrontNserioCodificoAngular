import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

import { NOrderDetail } from '../../../modelos/norderDetail';
import { Employees } from '../../../modelos/employees';
import { Shippers } from '../../../modelos/shippers';
import { Products } from '../../../modelos/productos';
import { DatePipe } from '@angular/common';
import { Customers } from '../../../modelos/customers';

import { ProductsService } from '../../../servers/products.service';
import { PredictionsService } from '../../../servers/predictions.service';
import { EmployeesService } from '../../../servers/employees.service';
import { ShippersService } from '../../../servers/shippers.service';
import { CustomersService } from '../../../servers/customers.service';


import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-prediction',
  standalone: false,
  templateUrl: './add-new-prediction.component.html',
  styleUrl: './add-new-prediction.component.css'
})
export class AddNewPredictionComponent  implements OnInit{

  ordenDetailForm!: FormGroup;
  customername!: string;
  employees : Employees= new  Employees();
  employeesar: Employees [] =[];

  shippers : Shippers= new  Shippers();
  shipperssar: Shippers [] =[];

  products : Products= new  Products();
  productssar: Products [] =[];

  customers : Customers= new  Customers();
  customerssar: Customers [] =[];

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private apie: EmployeesService,
    private apip: PredictionsService,
    private apis: ShippersService,
    private apipr: ProductsService,

    private apiC:CustomersService,
    public dialogRef: MatDialogRef<AddNewPredictionComponent>,
    private cdr: ChangeDetectorRef,
    private routera: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Datos recibidos en el modal:', this.data);

  }


  ngOnInit(): void {



    const id = Number(this.data?.are_idcarea);
      console.log('envio parametros al update ',this.data);
      console.log('numero envio ',id);

    this.ordenDetailForm = this.fb.group({
      orderid: [0, Validators.required],
      empid: [id, Validators.required],
      custid: [id, Validators.required],
      orderdate: [new Date(), Validators.required],
      requireddate: [new Date(), Validators.required],
      shippeddate: [new Date(), Validators.required],
      freight: [0, Validators.required],
      shipname: ['', Validators.required],
      shipaddress: ['', Validators.required],
      shipperid: ['', Validators.required],
      shipcity: ['', Validators.required],
      shipregion: ['', Validators.required],
      shippostalcode: ['', Validators.required],
      shipcountry: ['', Validators.required],
      productid:[0, Validators.required],
      unitprice:[0, Validators.required],
      qty:[0, Validators.required],
      discount:[0, Validators.required]
    });


    this.ordenDetailForm.patchValue(this.data);
    this.obtNomCustomer(id);
        this.obtEmployeeList();
        this.obtenerShippers();
        this.obtenerProducts();
  }



  private obtNomCustomer(id:number){

    this.apiC.getCustomersById(id).subscribe({
      next: (dato) => {
        console.log("Datos recibidos del backend:", dato);
        this.customerssar = dato;
        console.log("Datos recibidos del backend del customer:", dato);

      },
      error: (x) => {
        console.error("Error al obtener registro:", x);
        Swal.fire("Error", "No se pudo obtener la lista los registros.", "error");
      }
    });

  }


  private obtEmployeeList() {
    this.apie.getEmployeesList().subscribe({
      next: (dato) => {
        console.log("Datos recibidos del backend empleado:", dato);
        this.employeesar = dato;
      },
      error: (x) => {
        console.error("Error al obtener registro:", x);
        Swal.fire("Error", "No se pudo obtener la lista los registros.", "error");
      }
    });
  }




  private obtenerShippers() {
    this.apis.getShippersList().subscribe({
      next: (dato) => {
        console.log("Datos recibidos del backend shipper:", dato);
        this.shipperssar = dato;

      },
      error: (x) => {
        console.error("Error al obtener registro:", x);
        Swal.fire("Error", "No se pudo obtener la lista los registros.", "error");
      }
    });
  }


  private obtenerProducts() {
    this.apipr.getProductsList().subscribe({
      next: (dato) => {
        console.log("Datos recibidos del backend producto:", dato);
        this.productssar = dato;

      },
      error: (x) => {
        console.error("Error al obtener registro:", x);
        Swal.fire("Error", "No se pudo obtener la lista los registros.", "error");
      }
    });
  }

  formatDates(date: Date): string {
    // Usamos DatePipe para dar formato a la fecha
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss.SSS')!;
  }


  guardarNewOrden() {
          if (this.ordenDetailForm.valid) {



            const formData = { ...this.ordenDetailForm.value };



            formData.orderdate = this.formatDate(new Date(formData.orderdate));
      formData.requireddate = this.formatDate(new Date(formData.requireddate));
      formData.shippeddate = this.formatDate(new Date(formData.shippeddate));
            console.log("Datos enviados al backend:", formData); // Verifica qué

            this.apip.createNewOrdenDetails(formData).subscribe({
              next: (response) => {
                console.log(response);

                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'El registro se ingresó correctamente',
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  this.dialogRef.close(true);
                  window.location.reload();
                });
              },
              error: (error) => {
                console.error(error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Hubo un problema al ingresar el registro',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Formulario inválido',
              text: 'Completa los campos requeridos.',
              confirmButtonText: 'Aceptar'
            });
          }
        }

        formatDate(date: Date): string {
          return date.toISOString();
        }

               onSubmit() {
                  console.log('valores a guardar ' + JSON.stringify(this.ordenDetailForm.value, null, 2));
                  this.guardarNewOrden();
                }

                cerrarModal() {
                  this.dialogRef.close();
                  this.router.navigate(['predictionview']);
                }

                closeDialog() {
                  this.dialogRef.close();
                }

}
