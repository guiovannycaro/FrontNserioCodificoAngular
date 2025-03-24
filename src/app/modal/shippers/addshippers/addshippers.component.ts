import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Shippers } from '../../../modelos/shippers';
import { ShippersService } from '../../../servers/shippers.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-addshippers',
  standalone: false,
  templateUrl: './addshippers.component.html',
  styleUrl: './addshippers.component.css'
})
export class AddshippersComponent implements OnInit{

  shippersForm!: FormGroup;

  shippers : Shippers = new Shippers();

  constructor(
    private fb: FormBuilder,
    private api: ShippersService,
    public dialogRef: MatDialogRef<AddshippersComponent>,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.shippersForm = this.fb.group({
      shipperid: [0, Validators.required],
      companyname: ['', Validators.required],
      phone: ['', Validators.required]
    });

  }

  ngOnInit(): void {

  }

  guardarCategories() {
    if (this.shippersForm.valid) {
      this.api.createShippers(this.shippersForm.value).subscribe({
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



    const nombre = this.shippersForm.get('companyname')?.value;
    const descripcion = this.shippersForm.get('phone')?.value;



    if (!nombre) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre no puede estar vacío ',
        confirmButtonText: 'Aceptar'
      });
      return;
    }


    if (!descripcion ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La descripción no puede estar vacía .',
        confirmButtonText: 'Aceptar'
      });
      return;
    }


    console.log(this.shippersForm.value);
    this.guardarCategories();
  }

  cerrarModal() {
    this.dialogRef.close();
    this.router.navigate(['dashboard/shippers']);
  }

  closeDialog() {
    this.dialogRef.close();
  }


}

