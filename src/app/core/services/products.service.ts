import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
// import { myenvironment} from '../environments/environment';


@Injectable({

  providedIn: 'root'
})
export class ProductsService {
private readonly _HttpClient=inject(HttpClient);

getallproducts():Observable<any>{
  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  // return this._HttpClient.get(`${myenvironment.baseurl}/api/v1/products`)
}
getspecificproducts(id:string|null):Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}
}
