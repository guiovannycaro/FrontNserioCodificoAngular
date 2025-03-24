import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {Products} from '../modelos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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


getProductsList(): Observable<any>{
    let direccion = this.baseUrl + "Products/ListarProducts";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log('respuesta ',response);
    return response;
  }

  createProducts(areas: Products): Observable<any>{

    let direccion = this.baseUrl + "Products/InsertarProducts";
    let response = this.http.post<any>(direccion,areas,this.httpOptions);

    return response;

   }

    actualizarProducts(areas: Products): Observable<any>{
       let direccion = this.baseUrl + "Products/UpdateProducts";
       let response = this.http.post<any>(direccion,areas,this.httpOptions);
       console.log(response);
       return response;
      }

      eliminarProducts(data:number): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Products/DeleteProducts?dato=" + data;
        let response = this.http.delete<any>(direccion);
        console.log(response);
        return response;
       }


       getProductsByName(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Products/BuscarProductsByName/" + data;
        let response = this.http.get<any>(direccion);
        console.log(response);
        return response;
       }


       getProductsById(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Products/BuscarProductsById?dato=" + data;

        console.log("direccion " + direccion)
        let response = this.http.get<any>(direccion).pipe(
          tap((response: any) => console.log(" Respuesta del servidor:", response))
        );
        console.log(response);
        return response;
       }

}
