import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {OrderDetails} from '../modelos/orderdetails';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {



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


getOrderDetailList(): Observable<any>{
    let direccion = this.baseUrl + "OrderDetails/ListarOrderDetails";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log('respuesta ',response);
    return response;
  }

  createOrderDetail(areas: OrderDetails): Observable<any>{

    let direccion = this.baseUrl + "OrderDetails/InsertarOrderDetails";
    let response = this.http.post<any>(direccion,areas,this.httpOptions);

    return response;

   }

    actualizarOrderDetail(areas: OrderDetails): Observable<any>{
       let direccion = this.baseUrl + "OrderDetails/UpdateOrderDetails";
       let response = this.http.post<any>(direccion,areas,this.httpOptions);
       console.log(response);
       return response;
      }

      eliminarOrderDetail(data:number): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "OrderDetails/DeleteOrderDetails/" + data;
        let response = this.http.delete<any>(direccion);
        console.log(response);
        return response;
       }


       getOrderDetailByName(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "OrderDetails/BuscarOrderDetailsByName/" + data;
        let response = this.http.get<any>(direccion);
        console.log(response);
        return response;
       }


       getOrderDetailById(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "OrderDetails/BuscarOrderDetailsById/" + data;

        console.log("direccion " + direccion)
        let response = this.http.get<any>(direccion).pipe(
          tap((response: any) => console.log(" Respuesta del servidor:", response))
        );
        console.log(response);
        return response;
       }


       getDetailOrderById(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "OrderDetails/BuscarDetailsOrderById?dato=" + data;

        console.log("direccion " + direccion)
        let response = this.http.get<any>(direccion).pipe(
          tap((response: any) => console.log(" Respuesta del servidor:", response))
        );
        console.log(response);
        return response;
       }
}
