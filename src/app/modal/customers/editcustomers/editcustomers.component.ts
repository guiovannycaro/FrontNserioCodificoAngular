import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Customers } from '../../../modelos/customers';
import { CustomersService } from '../../../servers/customers.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-editcustomers',
  standalone: false,
  templateUrl: './editcustomers.component.html',
  styleUrl: './editcustomers.component.css'
})
export class EditcustomersComponent {
  customersForm!: FormGroup;
   customers : Customers= new  Customers();
    customerssar: Customers [] =[];

    constructor(
      private fb: FormBuilder,
      private api: CustomersService,
      public dialogRef: MatDialogRef<EditcustomersComponent>,
      private cdr: ChangeDetectorRef,
      private routera: ActivatedRoute,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      console.log('Datos recibidos en el modal:', this.data);

      this.customersForm = this.fb.group({
        custid: [0, Validators.required],
        companyname: ['', Validators.required],
        contactname: ['', Validators.required],
        contacttitle:['', Validators.required],
        address:['', Validators.required],
        city:['', Validators.required],
        region:['', Validators.required],
        postalcode:['', Validators.required],
        country:['', Validators.required],
        phone:['', Validators.required],
        fax:['', Validators.required]
      });
    }


    ngOnInit(): void {

      this.customersForm.patchValue(this.data);

      const id = Number(this.data?.are_idcarea);
        console.log('envio parametros al update ',this.data);
        console.log('numero envio ',id);
          this.obtCategoriesById(id);


    }


    obtCategoriesById(id: number) {
      if (!id || isNaN(id)) {
        console.error('ID no válido:', id);
        return;
      }

      console.log('🔹 Enviando ID a la API:', id);

      this.api.getCustomersById(id).subscribe({
        next: (response) => {
          console.log(' Respuesta de la API:', response);
           this.customerssar = response;
        },
        error: (err) => {
          console.error(' Error obteniendo área:', err);
        }
      });
    }


    editarCustomer(data: any) {
      this.api.actualizarCustomers(data).subscribe({
        next: (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El registro se actualizó correctamente',
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
            text: 'Hubo un problema al actualizar el registro',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }

    onSubmit() {

      const regexEspeciales = /[^a-zA-Z0-9\s]/;

      for (const area of this.customerssar) {

        if (!area.companyname || area.companyname.trim().length === 0) {


          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre no puede estar vacío',
            confirmButtonText: 'Aceptar'
          });

          return;
        }



        if (!area.contactname || area.contactname.trim().length === 0) {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La descripción no puede estar vacía.',
            confirmButtonText: 'Aceptar'
          });


          return;
        }


      }

      this.customerssar.forEach((area, index) => {
        console.log(`Areas ${index + 1}:`, area);

        this.editarCustomer(area);
      });


    }

    closeDialog() {
      this.dialogRef.close();
    }

  }
