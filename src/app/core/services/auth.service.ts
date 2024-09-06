import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Iauth } from '../interfaces/iauth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient=inject(HttpClient);
  userdata:Iauth={} as Iauth;
  private readonly _Router=inject(Router);

baseurl:string="https://ecommerce.routemisr.com";
// ///////////////////////////
  // constructor(private  _HttpClient:HttpClient) { }
// ////////////////////////////
  setregisterapi(data:object):Observable<any>{
return this._HttpClient.post(`${this.baseurl}/api/v1/auth/signup`,data)
  }
  // ///////////////////////
  setloginapi(data:object):Observable<any>{
return this._HttpClient.post(`${this.baseurl}/api/v1/auth/signin`,data)
  }
  // //////////////////
  savedata():void{
    if(localStorage.getItem("usertoken")!==null){
     this.userdata= jwtDecode(localStorage.getItem("usertoken")!)
     console.log(this.userdata);
     
    }
  }
  // /////////////////
  logout():void{
    localStorage.removeItem('usertoken');
    this.userdata={} as Iauth;
    // this.userdata=null;
    this._Router.navigate(['/login'])
  }

// //////////////forgot password
setemailverify(data:object):Observable<any>{
  return this._HttpClient.post(`${this.baseurl}/api/v1/auth/forgotPasswords`,data);
    } 
     setcodeverify(data:object|string):Observable<any>{
      return this._HttpClient.post(`${this.baseurl}/api/v1/auth/verifyResetCode`,data);
        } 
         setresetpassword(data:object):Observable<any>{
          return this._HttpClient.put(`${this.baseurl}/api/v1/auth/resetPassword`,data);
            }
      







          } 