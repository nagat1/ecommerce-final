import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseurl:string="https://ecommerce.routemisr.com";
  private readonly _Router=inject(Router);
  private readonly _Authservice=inject(AuthService);
  myheaders:any={token:localStorage.getItem('usertoken')};

  userdata:any=null;
  constructor(private  _HttpClient:HttpClient) { }

      
            checkoutapi(idcart:string|null,shipingdetails:object):Observable<any>{
          return this._HttpClient.post(`${this.baseurl}/api/v1/orders/checkout-session/${idcart}?url=http://localhost:4200`,{"shipingaddress":shipingdetails},{headers:this.myheaders});
            }
            cashapi(idcart:string|null,shipingdetails:object):Observable<any>{
          return this._HttpClient.post(`${this.baseurl}/api/v1/orders/${idcart}`,{"shipingaddress":shipingdetails},{headers:this.myheaders});
            }
      
            getuserorders(userid:string):Observable<any>{
        
             
          return this._HttpClient.get(`${this.baseurl}/api/v1/orders/user/${userid}`);
       
            }







}
