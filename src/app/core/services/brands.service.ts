import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private _HttpClient=inject(HttpClient)
  baseurl:string="https://ecommerce.routemisr.com";
   getallbrands():Observable<any>{
  return this._HttpClient.get(`${this.baseurl}/api/v1/brands`)
   }
   getspecificbrand(productid:string):Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/v1/brands/${productid}`)
     }

}
