import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Categories } from '../../../modelos/categories';
import { CategoriesService } from '../../../servers/categories.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-editcategories',
  standalone: false,
  templateUrl: './editcategories.component.html',
  styleUrl: './editcategories.component.css'
})
export class EditcategoriesComponent {
  categoryForm!: FormGroup;
  categories : Categories= new  Categories();
  categoriessar: Categories [] =[];

  constructor(
    private fb: FormBuilder,
    private api: CategoriesService,
    public dialogRef: MatDialogRef<EditcategoriesComponent>,
    private cdr: ChangeDetectorRef,
    private routera: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Datos recibidos en el modal:', this.data);

    this.categoryForm = this.fb.group({
      categoryid: [0, Validators.required],
      categoryname: ['', Validators.required],
      description: ['', Validators.required]
    });
  }


  ngOnInit(): void {

    this.categoryForm.patchValue(this.data);

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

    this.api.getCategoriesById(id).subscribe({
      next: (response) => {
        console.log(' Respuesta de la API:', response);
         this.categoriessar = response;
      },
      error: (err) => {
        console.error(' Error obteniendo área:', err);
      }
    });
  }


  editarCategories(data: any) {
    this.api.actualizarCategories(data).subscribe({
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

    for (const area of this.categoriessar) {

      if (!area.categoryname || area.categoryname.trim().length === 0) {


        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre no puede estar vacío',
          confirmButtonText: 'Aceptar'
        });

        return;
      }



      if (!area.description || area.description.trim().length === 0) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La descripción no puede estar vacía.',
          confirmButtonText: 'Aceptar'
        });


        return;
      }


    }

    this.categoriessar.forEach((area, index) => {
      console.log(`Areas ${index + 1}:`, area);

      this.editarCategories(area);
    });


  }

  closeDialog() {
    this.dialogRef.close();
  }

}
