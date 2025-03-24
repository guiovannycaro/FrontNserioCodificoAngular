import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {Suppliers} from '../modelos/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

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


 getSuppliersList(): Observable<any>{
     let direccion = this.baseUrl + "Suppliers/ListarSuppliers";
     let response = this.http.get<any>(direccion,this.httpOptions);
     console.log('respuesta ',response);
     return response;
   }

   createSuppliers(areas: Suppliers): Observable<any>{

     let direccion = this.baseUrl + "Suppliers/InsertarSuppliers";
     let response = this.http.post<any>(direccion,areas,this.httpOptions);

     return response;

    }

     actualizarSuppliers(areas: Suppliers): Observable<any>{
        let direccion = this.baseUrl + "Suppliers/UpdateSuppliers";
        let response = this.http.post<any>(direccion,areas,this.httpOptions);
        console.log(response);
        return response;
       }

       eliminarSuppliers(data:number): Observable<any>{

         console.log("parametro a enviar " + data)
         let direccion = this.baseUrl + "Suppliers/DeleteSuppliers?dato=" + data;
         let response = this.http.delete<any>(direccion);
         console.log(response);
         return response;
        }


        getSuppliersByName(data:any): Observable<any>{

         console.log("parametro a enviar " + data)
         let direccion = this.baseUrl + "Suppliers/BuscarSuppliersByName/" + data;
         let response = this.http.get<any>(direccion);
         console.log(response);
         return response;
        }


        getSuppliersById(data:any): Observable<any>{

         console.log("parametro a enviar " + data)
         let direccion = this.baseUrl + "Suppliers/BuscarSuppliersById?dato=" + data;

         console.log("direccion " + direccion)
         let response = this.http.get<any>(direccion).pipe(
           tap((response: any) => console.log(" Respuesta del servidor:", response))
         );
         console.log(response);
         return response;
        }


 }
