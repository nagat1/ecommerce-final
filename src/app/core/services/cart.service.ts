import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private _HttpClient=inject(HttpClient);
baseurl:string="https://ecommerce.routemisr.com";
myheaders:any={token:localStorage.getItem('usertoken')};
cartnumber:BehaviorSubject<number>=new BehaviorSubject (0) ;
//  //////////////////
addproducttocart(id:string):Observable<any>{
  return this._HttpClient.post(`${this.baseurl}/api/v1/cart`,{"productId": `${id}`},{headers:this.myheaders});
  
}
getproductscart():Observable<any>{
  return this._HttpClient.get(`${this.baseurl}/api/v1/cart`,{headers:this.myheaders});

}
deletespesificcartitem(id:string):Observable<any>{
  return this._HttpClient.delete(`${this.baseurl}/api/v1/cart/${id}`,{headers:this.myheaders});

}
updateproductquantity(id:string,newcount:number):Observable<any>{
  return this._HttpClient.put(`${this.baseurl}/api/v1/cart/${id}`,{"count":newcount},{headers:this.myheaders});

}
clearcart():Observable<any>{
  return this._HttpClient.delete(`${this.baseurl}/api/v1/cart`,{headers:this.myheaders});

}










}
