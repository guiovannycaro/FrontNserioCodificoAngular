import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Suppliers } from '../../../modelos/suppliers';
import { SuppliersService } from '../../../servers/suppliers.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edituppliers',
  standalone: false,
  templateUrl: './edituppliers.component.html',
  styleUrl: './edituppliers.component.css'
})
export class EdituppliersComponent {
 suppliersForm!: FormGroup;
 suppliers : Suppliers= new  Suppliers();
   suppliersar: Suppliers [] =[];

    constructor(
      private fb: FormBuilder,
      private api: SuppliersService,
      public dialogRef: MatDialogRef<EdituppliersComponent>,
      private cdr: ChangeDetectorRef,
      private routera: ActivatedRoute,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      console.log('Datos recibidos en el modal:', this.data);

      this.suppliersForm = this.fb.group({
        supplierid: [0, Validators.required],
        companyname: ['', Validators.required],
        contactname: ['', Validators.required],
        contacttitle: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        region: ['', Validators.required],
        postalcode: ['', Validators.required],
        country: ['', Validators.required],
        phone: ['', Validators.required],
        fax: ['', Validators.required]
      });
    }


    ngOnInit(): void {

      this.suppliersForm.patchValue(this.data);

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

      this.api.getSuppliersById(id).subscribe({
        next: (response) => {
          console.log(' Respuesta de la API:', response);
           this.suppliersar = response;
        },
        error: (err) => {
          console.error(' Error obteniendo área:', err);
        }
      });
    }


    editarCustomer(data: any) {
      this.api.actualizarSuppliers(data).subscribe({
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

      for (const area of this.suppliersar) {

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

      this.suppliersar.forEach((area, index) => {
        console.log(`Areas ${index + 1}:`, area);

        this.editarCustomer(area);
      });


    }

    closeDialog() {
      this.dialogRef.close();
    }

  }

