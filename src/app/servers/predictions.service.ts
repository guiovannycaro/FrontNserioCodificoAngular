import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { tap,map , catchError} from 'rxjs/operators';



import {ResponceI} from '../modelos/ResponceI';
import {PredictionView} from '../modelos/predictioview';
import { NOrderDetail } from '../modelos/norderDetail';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

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


  getPredictionssList(): Observable<any>{
  let direccion = this.baseUrl + "Prediction/ListarPrediction";
  let response = this.http.get<any>(direccion,this.httpOptions);
  console.log('respuesta ',response);
  return response;
}





createNewOrdenDetails(areas: NOrderDetail): Observable<any>{

    let direccion = this.baseUrl + "Prediction/createNewOrdenDetails";
    let response = this.http.post<any>(direccion,areas,this.httpOptions);

    return response;

   }

}
