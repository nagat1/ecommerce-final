import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private _CartService=inject(CartService);
  private _ToastrService=inject(ToastrService);
  cartdetails:Icart= {} as Icart;
ngOnInit(): void {
  this._CartService.getproductscart().subscribe({
    next:(res)=> {
      console.log(res.data)
  this.cartdetails=res.data;

    },
    error:(err)=> {
      console.log(err)
    },
  })
}

removeitem(id:string){
  this._CartService.deletespesificcartitem(id).subscribe({
    next:(res)=> {
      console.log(res)
  this.cartdetails=res.data;
this._ToastrService.warning("you removed item");
this._CartService.cartnumber.next(res.numOfCartItems)
    },
    error:(err)=> {
      console.log(err)
    },
  })
}


updatacount(id:string,count:number){
if(count>1){
  this._CartService.updateproductquantity(id,count).subscribe({
    next:(res)=> {
      console.log(res)
  this.cartdetails=res.data;
  this._ToastrService.info("you updated the count of this item");
 
    },
 
  })
}
}

clearitems(){
  this._CartService.clearcart().subscribe({
    next:(res)=> {
      console.log(res)
      this._CartService.cartnumber.next(0)

if(res.message=="success"){
  this.cartdetails={} as Icart;
}
  
    },
    error:(err)=> {
      console.log(err)
    },
  })
}





}
