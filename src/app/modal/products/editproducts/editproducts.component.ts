import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Products } from '../../../modelos/productos';
import { ProductsService } from '../../../servers/products.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-editproducts',
  standalone: false,
  templateUrl: './editproducts.component.html',
  styleUrl: './editproducts.component.css'
})
export class EditproductsComponent {
  productsForm!: FormGroup;
  products : Products= new  Products();
  productssar: Products [] =[];

  constructor(
    private fb: FormBuilder,
    private api: ProductsService,
    public dialogRef: MatDialogRef<EditproductsComponent>,
    private cdr: ChangeDetectorRef,
    private routera: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Datos recibidos en el modal:', this.data);

    this.productsForm = this.fb.group({
      productid: [0, Validators.required],
      productname: ['', Validators.required],
      supplierid: [0, Validators.required],
      categoryid: [0, Validators.required],
      unitprice: [0, Validators.required],
      discontinued: [true, Validators.required],
    });
  }


  ngOnInit(): void {

    this.productsForm.patchValue(this.data);

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

    this.api.getProductsById(id).subscribe({
      next: (response) => {
        console.log(' Respuesta de la API:', response);
         this.productssar = response;
      },
      error: (err) => {
        console.error(' Error obteniendo área:', err);
      }
    });
  }


  editarCategories(data: any) {
    this.api.actualizarProducts(data).subscribe({
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

    for (const area of this.productssar) {

      if (!area.productname || area.productname.trim().length === 0) {


        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre no puede estar vacío',
          confirmButtonText: 'Aceptar'
        });

        return;
      }



      if (!area.categoryid || area.categoryid  === 0) {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La descripción no puede estar vacía.',
          confirmButtonText: 'Aceptar'
        });


        return;
      }


    }

    this.productssar.forEach((area, index) => {
      console.log(`Areas ${index + 1}:`, area);

      this.editarCategories(area);
    });


  }

  closeDialog() {
    this.dialogRef.close();
  }

}

