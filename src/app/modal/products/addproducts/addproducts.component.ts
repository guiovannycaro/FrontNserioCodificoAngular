import { Component, Inject,OnInit  } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Products } from '../../../modelos/productos';
import { ProductsService } from '../../../servers/products.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addproducts',
  standalone: false,
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.css'
})
export class AddproductsComponent implements OnInit{

  productsForm!: FormGroup;

  products : Products = new Products();

  constructor(
    private fb: FormBuilder,
    private api: ProductsService,
    public dialogRef: MatDialogRef<AddproductsComponent>,
    private router: Router,
    private route: ActivatedRoute

  ) {
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

  }

  guardarCategories() {
    if (this.productsForm.valid) {
      this.api.createProducts(this.productsForm.value).subscribe({
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



    const nombre = this.productsForm.get('productname')?.value;
    const descripcion = this.productsForm.get('supplierid')?.value;



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


    console.log(this.productsForm.value);
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

