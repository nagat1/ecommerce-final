import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productlist:Iproduct[]=[]; 
  getallproductssub!:Subscription;
  private _ProductsService=inject(ProductsService)
  private _cartservice=inject(CartService)
  private _WishlistService=inject(WishlistService)
  private _ToastrService=inject(ToastrService);
  text:string="";
  data:string[]=[]; 
  ///////////////////////
  ngOnInit(): void {
   this.getallproductssub= this._ProductsService.getallproducts().subscribe({
      next:(res)=> {
        console.log(res.data)
        console.log("products")
        this.productlist=res.data;
      },
   
    })
    this._WishlistService.getproductswishlist().subscribe({
      next:(res)=> {
        console.log(res)
        console.log("wishlist")
        this.data=res.data.map((item:any)=>item._id)
        // this.wishlistdata= this._WishlistService.wishdetails
      },
    });
  
  }

  addcart(id:string):void{
    this._cartservice.addproducttocart(id).subscribe({
      next:(res)=> {
        console.log(res.data)
        this._ToastrService.success(res.message,'Fresh Cart');
     
      },
   
    })
    }

    @ViewChild('noga')x!:ElementRef;

    addwishlist(id:string):void{
      this._WishlistService.addproducttowishlist(id).subscribe({
        next:(res)=> {
          console.log(res.data)
          this.data=res.data
          // this.wishlistdata=    this._WishlistService.wishdata
          localStorage.setItem("red",'text-red-500')
          this._ToastrService.success(res.message,'Fresh Cart');
          // this.togglecolor(id,this.color);
        },
      })
      }
      
      removefromwishlist(id:string){
        this._WishlistService.deletespesificwishitem(id).subscribe({
          next:(res)=> {
            console.log(res.data);
            this.data=res.data
            // this.wishlistdata=this._WishlistService.wishdata            
            this._ToastrService.warning(res.message,'Fresh Cart');
            },
          
          })
      }
      



}
