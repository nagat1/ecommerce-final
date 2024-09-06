import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private _WishlistService=inject(WishlistService);
  private _CartService=inject(CartService);
  private _ToastrService=inject(ToastrService);
  wishdetails:Iwishlist[]=[];
 data:string[]=[];
ngOnInit(): void {
  this._WishlistService.getproductswishlist().subscribe({
    next:(res)=> {
      console.log(res)

  this.wishdetails=res.data
  this.data=res.data.map((item:any)=>item._id)

    },
 
  })
}
addcart(id:string):void{
  this._CartService.addproducttocart(id).subscribe({
    next:(res)=> {
      console.log(res.data)
      this._CartService.cartnumber.next(res.numOfCartItems);
      this._ToastrService.success(res.message,'Fresh Cart');
    },

  })
  }


  removeitem(id:string){
    this._WishlistService.deletespesificwishitem(id).subscribe({
      next:(res)=> {
        console.log(res.data);
     
        this.wishdetails=res.data;
        this.data=res.data

        this._ToastrService.warning(res.message,'Fresh Cart');
        },
      
      })
  }
  




}
