import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private _ProductsService=inject(ProductsService)
  private _CartService=inject(CartService)
  private _ToastrService=inject(ToastrService)
  private _ActivatedRoute=inject(ActivatedRoute)
  detailsproduct:Iproduct|null=null;
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p) =>{
    console.log(p);
   let idproduct =p.get('id');
  this._ProductsService.getspecificproducts(idproduct ).subscribe({
    next:(res) =>{console.log(res);
      this.detailsproduct=res.data;
    },

    
  })
  }
  })
}
addcart(id:string):void{
  this._CartService.addproducttocart(id).subscribe({
    next:(res)=> {
      console.log(res.data);
      this._ToastrService.success(res.message,'Fresh Cart');
      this._CartService.cartnumber.next(res.numOfCartItems);

    }
   
    
  
  })
  }





}
