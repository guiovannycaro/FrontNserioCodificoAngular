import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Employees } from '../../../modelos/employees';
import { EmployeesService } from '../../../servers/employees.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addemployees',
  standalone: false,
  templateUrl: './addemployees.component.html',
  styleUrl: './addemployees.component.css'
})
export class AddemployeesComponent implements OnInit{

  employeesForm!: FormGroup;

  employees : Employees = new Employees();

    constructor(
      private fb: FormBuilder,
      private api: EmployeesService,
      public dialogRef: MatDialogRef<AddemployeesComponent>,
      private router: Router,
      private route: ActivatedRoute

    ) {
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

    }


    guardarEmployee() {
      if (this.employeesForm.valid) {
        // Formatear la fecha antes de enviar
        const formData = { ...this.employeesForm.value };
        formData.birthdate = this.formatDate(new Date(formData.birthdate));
        formData.hiredate = this.formatDate(new Date(formData.hiredate));

        console.log("Datos enviados al backend:", formData); // Verifica qué se está enviando

        this.api.createEmployees(formData).subscribe({
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
            console.error("Error en el backend:", error);
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

    // Función para formatear la fecha (YYYY-MM-DD HH:mm:ss)
    formatDate(date: Date): string {
      return date.toISOString();
    }

       onSubmit() {

          const companyname = this.employeesForm.get('lastname')?.value;
          const contactname = this.employeesForm.get('firstname')?.value;



          if (!companyname) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El nombre no puede estar vacío ',
              confirmButtonText: 'Aceptar'
            });
            return;
          }

          if (!contactname ) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'La descripción no puede estar vacía .',
              confirmButtonText: 'Aceptar'
            });
            return;
          }

          console.log(this.employeesForm.value);
          this.guardarEmployee();
        }

        cerrarModal() {
          this.dialogRef.close();
          this.router.navigate(['dashboard/employees']);
        }

        closeDialog() {
          this.dialogRef.close();
        }
}



