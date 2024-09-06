import { Product } from './../../core/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { PaymentService } from '../../core/services/payment.service';
import { AuthService } from '../../core/services/auth.service';

import { RouterLink } from '@angular/router';
import { online } from '../../core/interfaces/ipayment';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
private _PaymentService=inject(PaymentService)
private _AuthService=inject(AuthService)

// openmail(mail:string){
//  let usermail=`${mail}`;
//   window.open(usermail,"_self");
  
// }


orderdetailsonline:online[]=[];
ngOnInit(): void {
 this._AuthService.savedata();
let userid=this._AuthService.userdata.id;
console.log(userid)

  this._PaymentService.getuserorders(userid).subscribe({
    next:(res)=> {
      console.log(res)
 this.orderdetailsonline=res;

    },
    error:(err)=> {
      console.log(err)
    },
  })
}
edit(){
  
}




}
