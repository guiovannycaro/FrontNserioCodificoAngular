import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {Categories} from '../modelos/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

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


  getCategoriesList(): Observable<any>{
    let direccion = this.baseUrl + "Categories/ListarCategories";
    let response = this.http.get<any>(direccion,this.httpOptions);
    console.log('respuesta ',response);
    return response;
  }

  createCategories(areas: Categories): Observable<any>{

    let direccion = this.baseUrl + "Categories/InsertarCategories";
    let response = this.http.post<any>(direccion,areas,this.httpOptions);

    return response;

   }

    actualizarCategories(areas: Categories): Observable<any>{
       let direccion = this.baseUrl + "Categories/UpdateCategories";
       let response = this.http.post<any>(direccion,areas,this.httpOptions);
       console.log(response);
       return response;
      }

      eliminarCategories(data:number): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Categories/DeleteCategories/" + data;
        let response = this.http.delete<any>(direccion);
        console.log(response);
        return response;
       }


       getCategoriesByName(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Categories/BuscarCategoriesByName/" + data;
        let response = this.http.get<any>(direccion);
        console.log(response);
        return response;
       }


       getCategoriesById(data:any): Observable<any>{

        console.log("parametro a enviar " + data)
        let direccion = this.baseUrl + "Categories/BuscarCategoriesById?dato=" + data;

        console.log("direccion " + direccion)
        let response = this.http.get<any>(direccion).pipe(
          tap((response: any) => console.log(" Respuesta del servidor:", response))
        );
        console.log(response);
        return response;
       }

}
