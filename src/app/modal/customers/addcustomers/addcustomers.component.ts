import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Customers } from '../../../modelos/customers';
import { CustomersService } from '../../../servers/customers.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addcustomers',
  standalone: false,
  templateUrl: './addcustomers.component.html',
  styleUrl: './addcustomers.component.css'
})
export class AddcustomersComponent implements OnInit{

  customersForm!: FormGroup;

    customers : Customers = new Customers();

    constructor(
      private fb: FormBuilder,
      private api: CustomersService,
      public dialogRef: MatDialogRef<AddcustomersComponent>,
      private router: Router,
      private route: ActivatedRoute

    ) {
      this.customersForm = this.fb.group({
        custid: [0, Validators.required],
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

    }


      guardarCustomers() {
        if (this.customersForm.valid) {
          this.api.createCustomers(this.customersForm.value).subscribe({
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

       onSubmit() {

          const companyname = this.customersForm.get('companyname')?.value;
          const contactname = this.customersForm.get('contactname')?.value;



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

          console.log(this.customersForm.value);
          this.guardarCustomers();
        }

        cerrarModal() {
          this.dialogRef.close();
          this.router.navigate(['dashboard/customers']);
        }

        closeDialog() {
          this.dialogRef.close();
        }
}
