import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


import { Categories } from '../../modelos/categories';
import { CategoriesService } from '../../servers/categories.service';
import { AddcategoriesComponent } from '../../modal/categories/addcategories/addcategories.component';
import { EditcategoriesComponent } from '../../modal/categories/editcategories/editcategories.component';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent  implements AfterViewInit,OnInit{

  displayedColumns: string[] = ['id', 'Nombre','Descripcion','Acciones'];
  dataSource = new MatTableDataSource<Categories>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: CategoriesService,
    private router: Router,
    public dialog: MatDialog

  ) {

}


ngOnInit(): void {
  this.obtenerCategories();
}


private obtenerCategories() {
  this.api.getCategoriesList().subscribe({
    next: (dato) => {
      console.log("Datos recibidos del backend:", dato);
      this.dataSource = new MatTableDataSource(dato);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    },
    error: (x) => {
      console.error("Error al obtener registro:", x);
      Swal.fire("Error", "No se pudo obtener la lista los registros.", "error");
    }
  });
}


openAddProForm() {
  this.dialog.open(AddcategoriesComponent);

}

openEditProForm(id: number) {
  if (!id) {
    console.error("Error: ID es undefined o null");
    return;
  }

  this.dialog.open(EditcategoriesComponent, {
    data: { are_idcarea: id },
    width: '500px'
  });
}


openDropProForm(id: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esta acción',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.api.eliminarCategories(id).subscribe({
        next: (data) => {
          console.log('registro eliminada:', data);
          Swal.fire('¡Eliminado!', 'El registro ha sido eliminada.', 'success');
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al eliminar el registro:', error);
          Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
        }
      });
    }
  });
}


ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
