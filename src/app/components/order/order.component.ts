import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { PaymentService } from '../../core/services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ordercash } from '../../core/interfaces/cash';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  private readonly _paymentservice=inject(PaymentService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router);
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  cartid:string|null='';
  cashproducts: ordercash= {} as  ordercash;
// msgsuccess:boolean=false;
// ///////////////////////////

orderform:FormGroup=this._FormBuilder.group({
  details: [null,[Validators.required,Validators.maxLength(50)]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:[null,[Validators.required]],

});

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{this.cartid=params.get('id')}
  })
}
// /////////////////////////////////////
ordersubmit():void{
  console.log(this.orderform.value);
  this._paymentservice.checkoutapi(this.cartid,this.orderform.value).subscribe({
      next:(res) =>{console.log(res);
        if(res.status==="success"){
       window.open(res.session.url)

        }
      },

      error:(err:HttpErrorResponse) =>{console.log(err)},
    });
  }
cashorder():void{
  console.log(this.orderform.value);
  this._paymentservice.cashapi(this.cartid,this.orderform.value).subscribe({
      next:(res) =>{console.log(res.data);
   this.cashproducts=res.data;
   if(res.status==="success"){
    window.open('allorders')

     }
      },

      error:(err:HttpErrorResponse) =>{console.log(err)},
    });
  }











}
