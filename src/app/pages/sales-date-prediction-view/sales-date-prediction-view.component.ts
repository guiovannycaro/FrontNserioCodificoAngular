import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { PredictionView } from '../../modelos/predictioview';
import { PredictionsService } from '../../servers/predictions.service';
import { OpenViewCustomerComponent } from '../../modal/predictions/open-view-customer/open-view-customer.component';
import { AddNewPredictionComponent } from '../../modal/predictions/add-new-prediction/add-new-prediction.component';

@Component({
  selector: 'app-sales-date-prediction-view',
  standalone: false,
  templateUrl: './sales-date-prediction-view.component.html',
  styleUrl: './sales-date-prediction-view.component.css'
})
export class SalesDatePredictionViewComponent implements AfterViewInit,OnInit{

  displayedColumns: string[] = ['id', 'companyname','contactname','orderdate','nexpredictedorder','Acciones'];

   dataSource = new MatTableDataSource<PredictionView>();

   @ViewChild(MatPaginator) paginator!: MatPaginator;
       @ViewChild(MatSort) sort!: MatSort;

       constructor(private api: PredictionsService,
         private router: Router,
         public dialog: MatDialog

       ) {

     }

     ngOnInit(): void {
      this.obtenerPredictions();
    }


      private obtenerPredictions() {
        this.api.getPredictionssList().subscribe({
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



      openViewProForm(id: number) {
        if (!id) {
          console.error("Error: ID es undefined o null");
          return;
        }

        this.dialog.open(OpenViewCustomerComponent, {
          data: { are_idcarea: id },
          width: '1200vw',  // O el tamaño que necesites
              minWidth: '900px'
        });

      }


      openNewProForm(id: number) {
        if (!id) {
          console.error("Error: ID es undefined o null");
          return;
        }

        this.dialog.open(AddNewPredictionComponent, {
          data: { are_idcarea: id },
          width: '1200vw',  // O el tamaño que necesites
              minWidth: '900px'
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
