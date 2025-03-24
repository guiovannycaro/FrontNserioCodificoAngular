import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {Employees} from '../modelos/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private baseUrl = "http://localhost:8090/nserio/AppAdmin/";
  id: number;

  constructor(private http: HttpClient) {
    this.id =0;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


getEmployeesList(): Observable<any>{
    let direccion = this.baseUrl + "Employees/ListarEmployees";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log('respuesta ',response);
    return response;
  }

  createEmployees(areas: Employees): Observable<any>{

    console.log("Datos enviados del servicio:", areas); // Verific
    let direccion = this.baseUrl + "Employees/InsertarEmployees";
    let response = this.http.post<any>(direccion,areas,this.httpOptions);

    return response;

   }

    actualizarEmployees(areas: Employees): Observable<any>{
       let direccion = this.baseUrl + "Employees/UpdateEmployees";
       let response = this.http.post<any>(direccion,areas,this.httpOptions);
       console.log(response);
       return response;
      }

      eliminarEmployees(data:number): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Employees/DeleteEmployees?dato=" + data;
        let response = this.http.delete<any>(direccion);
        console.log(response);
        return response;
       }


       getEmployeessByName(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Employees/BuscarEmployeesByName/" + data;
        let response = this.http.get<any>(direccion);
        console.log(response);
        return response;
       }


       getEmployeesById(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Employees/BuscarEmployeesById?dato=" + data;

        console.log("direccion " + direccion)
        let response = this.http.get<any>(direccion).pipe(
          tap((response: any) => console.log(" Respuesta del servidor:", response))
        );
        console.log(response);
        return response;
       }






       private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
}
