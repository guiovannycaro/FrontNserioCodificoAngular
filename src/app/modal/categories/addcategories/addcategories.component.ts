import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Categories } from '../../../modelos/categories';
import { CategoriesService } from '../../../servers/categories.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addcategories',
  standalone: false,
  templateUrl: './addcategories.component.html',
  styleUrl: './addcategories.component.css'
})
export class AddcategoriesComponent implements OnInit{

  categoryForm!: FormGroup;

  category : Categories = new Categories();

  constructor(
    private fb: FormBuilder,
    private api: CategoriesService,
    public dialogRef: MatDialogRef<AddcategoriesComponent>,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.categoryForm = this.fb.group({
      categoryid: [0, Validators.required],
      categoryname: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  ngOnInit(): void {

  }

  guardarCategories() {
    if (this.categoryForm.valid) {
      this.api.createCategories(this.categoryForm.value).subscribe({
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



    const nombre = this.categoryForm.get('categoryname')?.value;
    const descripcion = this.categoryForm.get('description')?.value;



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


    console.log(this.categoryForm.value);
    this.guardarCategories();
  }

  cerrarModal() {
    this.dialogRef.close();
    this.router.navigate(['dashboard/categoris']);
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
