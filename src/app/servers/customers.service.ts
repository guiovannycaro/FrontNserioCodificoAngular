import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {Customers} from '../modelos/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

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

 getCustomersList(): Observable<any>{
    let direccion = this.baseUrl + "Customers/ListarCustomers";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log('respuesta ',response);
    return response;
  }

  createCustomers(areas: Customers): Observable<any>{

    let direccion = this.baseUrl + "Customers/InsertarCustomers";
    let response = this.http.post<any>(direccion,areas,this.httpOptions);

    return response;

   }

    actualizarCustomers(areas: Customers): Observable<any>{
       let direccion = this.baseUrl + "Customers/UpdateCustomers";
       let response = this.http.post<any>(direccion,areas,this.httpOptions);
       console.log(response);
       return response;
      }

      eliminarCustomers(data:number): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Customers/DeleteCustomers?dato=" + data;
        let response = this.http.delete<any>(direccion);
        console.log(response);
        return response;
       }


       getCustomersByName(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Customers/BuscarCustomersByName/" + data;
        let response = this.http.get<any>(direccion);
        console.log(response);
        return response;
       }


       getCustomersById(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Customers/BuscarCustomersById?dato=" + data;

        console.log("direccion " + direccion)
        let response = this.http.get<any>(direccion).pipe(
          tap((response: any) => console.log(" Respuesta del servidor:", response))
        );
        console.log(response);
        return response;
       }

}
