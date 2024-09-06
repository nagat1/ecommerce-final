import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
private _HttpClient=inject(HttpClient)
baseurl:string="https://ecommerce.routemisr.com";
 getallcategories():Observable<any>{
return this._HttpClient.get(`${this.baseurl}/api/v1/categories`)
 }
 getspecificcategory(productid:string):Observable<any>{
return this._HttpClient.get(`${this.baseurl}/api/v1/categories/${productid}`)
 }
 getsub(id:string):Observable<any>{
return this._HttpClient.get(`${this.baseurl}/api/v1/categories/${id}/subcategories/`)
 }




}
