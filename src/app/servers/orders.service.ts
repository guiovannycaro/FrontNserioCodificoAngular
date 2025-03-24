import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {Orders} from '../modelos/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

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


 getOrdersList(): Observable<any>{
     let direccion = this.baseUrl + "Orders/ListarOrders";
     let response = this.http.get<any>(direccion,this.httpOptions);
     console.log('respuesta ',response);
     return response;
   }

   createOrders(areas: Orders): Observable<any>{

     let direccion = this.baseUrl + "Orders/InsertarOrders";
     let response = this.http.post<any>(direccion,areas,this.httpOptions);

     return response;

    }

     actualizaOrders(areas: Orders): Observable<any>{
        let direccion = this.baseUrl + "Orders/UpdateOrders";
        let response = this.http.post<any>(direccion,areas,this.httpOptions);
        console.log(response);
        return response;
       }

       eliminarOrders(data:number): Observable<any>{

         console.log("parametro a enviar " + data)
         let direccion = this.baseUrl + "Orders/DeleteOrders?dato=" + data;
         let response = this.http.delete<any>(direccion);
         console.log(response);
         return response;
        }


        getOrdersByName(data:any): Observable<any>{

         console.log("parametro a enviar " + data)
         let direccion = this.baseUrl + "Orders/BuscarOrdersByName/" + data;
         let response = this.http.get<any>(direccion);
         console.log(response);
         return response;
        }


        getOrdersById(data:any): Observable<any>{

         console.log("parametro a enviar " + data)
         let direccion = this.baseUrl + "Orders/BuscarOrdersById?dato=" + data;

         console.log("direccion " + direccion)
         let response = this.http.get<any>(direccion).pipe(
           tap((response: any) => console.log(" Respuesta del servidor:", response))
         );
         console.log(response);
         return response;
        }


        getOrdersCustomerList(data:any): Observable<any>{
          console.log("parametro a enviar " + data)
          let direccion = this.baseUrl + "Orders/BuscarOrdersCustomersById?dato=" + data;

          console.log("direccion " + direccion)
          let response = this.http.get<any>(direccion).pipe(
            tap((response: any) => console.log(" Respuesta del servidor:", response))
          );
          console.log(response);
          return response;


        }

}
