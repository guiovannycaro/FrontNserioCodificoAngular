import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {Shippers} from '../modelos/shippers';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {

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


getShippersList(): Observable<any>{
    let direccion = this.baseUrl + "Shippers/ListarShippers";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log('respuesta ',response);
    return response;
  }

  createShippers(areas: Shippers): Observable<any>{

    let direccion = this.baseUrl + "Shippers/InsertarShippers";
    let response = this.http.post<any>(direccion,areas,this.httpOptions);

    return response;

   }

    actualizarShippers(areas: Shippers): Observable<any>{
       let direccion = this.baseUrl + "Shippers/UpdateShippers";
       let response = this.http.post<any>(direccion,areas,this.httpOptions);
       console.log(response);
       return response;
      }

      eliminarShippers(data:number): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Shippers/DeleteShippers?dato=" + data;
        let response = this.http.delete<any>(direccion);
        console.log(response);
        return response;
       }


       getShippersByName(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Shippers/BuscarShippersByName/" + data;
        let response = this.http.get<any>(direccion);
        console.log(response);
        return response;
       }


       getShippersById(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Shippers/BuscarShippersById?dato=" + data;

        console.log("direccion " + direccion)
        let response = this.http.get<any>(direccion).pipe(
          tap((response: any) => console.log(" Respuesta del servidor:", response))
        );
        console.log(response);
        return response;
       }


}

