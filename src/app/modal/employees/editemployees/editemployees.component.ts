import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Employees } from '../../../modelos/employees';
import { EmployeesService } from '../../../servers/employees.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editemployees',
  standalone: false,
  templateUrl: './editemployees.component.html',
  styleUrl: './editemployees.component.css'
})
export class EditemployeesComponent {
  employeesForm!: FormGroup;
 employees : Employees= new  Employees();
   employeesar: Employees [] =[];

    constructor(
      private fb: FormBuilder,
      private api: EmployeesService,
      public dialogRef: MatDialogRef<EditemployeesComponent>,
      private cdr: ChangeDetectorRef,
      private routera: ActivatedRoute,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      console.log('Datos recibidos en el modal:', this.data);

      this.employeesForm = this.fb.group({
        empid: [0, Validators.required],
        lastname: ['', Validators.required],
        firstname: ['', Validators.required],
        title: ['', Validators.required],
        titleofcourtesy: ['', Validators.required],
        birthdate: [new Date(), Validators.required],
        hiredate: [new Date(), Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        region: ['', Validators.required],
        postalcode: ['', Validators.required],
        country: ['', Validators.required],
        phone: ['', Validators.required],
        mgrid: ['', Validators.required]
      });
    }


    ngOnInit(): void {

      this.employeesForm.patchValue(this.data);

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

      this.api.getEmployeesById(id).subscribe({
        next: (response) => {
          console.log(' Respuesta de la API:', response);
           this.employeesar = response;
        },
        error: (err) => {
          console.error(' Error obteniendo área:', err);
        }
      });
    }


    editarCustomer(data: any) {

      const formData = { ...data };
      console.log("Datos recibidos:", formData);
      formData.birthdate = this.formatDate(new Date(formData.birthdate));
      formData.hiredate = this.formatDate(new Date(formData.hiredate));

      this.api.actualizarEmployees(formData).subscribe({
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

    formatDate(date: any): string {
      if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toISOString();
      }
      return '';
    }
    onSubmit() {

      const regexEspeciales = /[^a-zA-Z0-9\s]/;

      for (const area of this.employeesar) {

        if (!area.firstname || area.firstname.trim().length === 0) {


          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre no puede estar vacío',
            confirmButtonText: 'Aceptar'
          });

          return;
        }



        if (!area.lastname|| area.lastname.trim().length === 0) {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La descripción no puede estar vacía.',
            confirmButtonText: 'Aceptar'
          });


          return;
        }


      }

      this.employeesar.forEach((area, index) => {
        console.log(`Areas ${index + 1}:`, area);

        if (area && area.birthdate && area.hiredate) {
          console.log(`Editando el área ${index + 1} con fechas: ${area.birthdate}, ${area.hiredate}`);
          this.editarCustomer(area);
        } else {
          console.warn(`Área ${index + 1} no tiene fechas válidas:`, area);
        }
      });


    }

    closeDialog() {
      this.dialogRef.close();
    }

  }
