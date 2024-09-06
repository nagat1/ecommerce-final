import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iwishlist } from '../interfaces/iwishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private _HttpClient=inject(HttpClient);
  baseurl:string="https://ecommerce.routemisr.com";
  myheaders:any={token:localStorage.getItem('usertoken')};
  // wishdata:string[]=[];
  // wishdetails:Iwishlist[]=[];
  addproducttowishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/v1/wishlist`,{"productId": `${id}`},{headers:this.myheaders});
    
  }
  getproductswishlist():Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/v1/wishlist`,{headers:this.myheaders});
  
  }
  deletespesificwishitem(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseurl}/api/v1/wishlist/${id}`,{headers:this.myheaders});
  
  }







}
