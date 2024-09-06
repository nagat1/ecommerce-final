import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { WishlistService } from '../../core/services/wishlist.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{
private readonly _ProductsService=inject(ProductsService);
private readonly _CategoriesService=inject(CategoriesService);
private readonly _CartService=inject(CartService);
private readonly _WishlistService=inject(WishlistService);
private readonly _ToastrService=inject(ToastrService);
data:string[]=[];

text:string="";
getallproductssub!:Subscription;
productlist:Iproduct[]=[];
categorylist:Icategory[]=[];
///////////////////////
ngOnInit(): void {
  
 this.getallproductssub= this._ProductsService.getallproducts().subscribe({
    next:(res)=> {
      console.log(res)
      console.log("products")
      this.productlist=res.data;
    },
  
  });

  this._CategoriesService.getallcategories().subscribe({
    next:(res)=> {
      console.log(res)
      console.log("categories")
      this.categorylist=res.data;
    },
  
  });
  this._WishlistService.getproductswishlist().subscribe({
    next:(res)=> {
      console.log(res)
      console.log("wishlist")
      this.data=res.data.map((item:any)=>item._id)
    },
  });

}
ngOnDestroy(): void {
  this.getallproductssub?.unsubscribe();
  console.log("byeeeeee")
}
customOptionsmain: OwlOptions= {

  loop: true,
  mouseDrag: false,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],

 responsive: {
  0: {
    items: 1
  },
  400: {
    items: 1
  },
  740: {
    items: 1
  },
  940: {
    items: 1
  }
},
  nav: true
}

customOptionscat: OwlOptions= {
autoplay:true,
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}


addcart(id:string):void{
this._CartService.addproducttocart(id).subscribe({
  next:(res)=> {
    console.log(res);

    this._ToastrService.success(res.message,'Fresh Cart');
    this._CartService.cartnumber.next(res.numOfCartItems);

  }
 
  

})
}


// ///////////////////////////////////////////////////////////
@ViewChild('noga')x!:ElementRef;

addwishlist(id:string):void{
  this._WishlistService.addproducttowishlist(id).subscribe({
    next:(res)=> {
      console.log(res.data)
      this.data=res.data
            localStorage.setItem("red",'text-red-500')
      this._ToastrService.success(res.message,'Fresh Cart');
    },
  })
  }
  
  removefromwishlist(id:string){
    this._WishlistService.deletespesificwishitem(id).subscribe({
      next:(res)=> {
        console.log(res.data);
        this.data=res.data
        this._ToastrService.warning(res.message,'Fresh Cart');
        },
      
      })
  }
  







}