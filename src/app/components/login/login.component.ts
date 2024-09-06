import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _FormBuilder=inject(FormBuilder);
  private _AuthService=inject(AuthService);
  private _Router=inject(Router);
  msgsuccess:boolean=false;

  // /////////////////////
loginform:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.minLength(6),Validators.pattern(/^\w{6,}$/)]],
})

// //////////////////
loginsubmit():void{
if(this.loginform.valid){
  this._AuthService.setloginapi(this.loginform.value).subscribe({

    next:(res) =>{console.log(res);
      if(res.message=="success"){
        this.msgsuccess=true;
setTimeout(() => {
  localStorage.setItem("usertoken",res.token)
  this._AuthService.savedata();
this._Router.navigate(["/home"])
}, 2000);
      }
    },

    error:(err:HttpErrorResponse) =>{console.log(err)},



  })}
  else{
    this.loginform.setErrors({mismatch:true});
    this.loginform.markAllAsTouched()
  }
}
  









  }