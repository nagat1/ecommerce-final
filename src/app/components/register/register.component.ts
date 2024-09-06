import { NgClass } from '@angular/common';
import { Component, inject} from '@angular/core';
import { AbstractControl, FormBuilder,  FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  private readonly _AuthService=inject(AuthService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router);
msgsuccess:boolean=false;
// ///////////////////////////

registerform:FormGroup=this._FormBuilder.group({
  name: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.minLength(6),Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
  phone:[null,[Validators.required]],
  // phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
},{validators:[this.cofirmpassword]});
// /////////////////////////////////////
registersubmit():void{
  if(this.registerform.valid){
    // console.log(this.registerform);
    this._AuthService.setregisterapi(this.registerform.value).subscribe({
      next:(res) =>{console.log(res);
        if(res.message=="success"){
          this.msgsuccess=true;
setTimeout(() => {
  this._Router.navigate(["/login"])
}, 2000);
        }
      },

      error:(err:HttpErrorResponse) =>{console.log(err)},
    });
  }
else{
  this.registerform.setErrors({mismatch:true});
  this.registerform.markAllAsTouched()
}
}
// ///////////////////////
cofirmpassword(g:AbstractControl){
  if (g.get("password")?.value===g.get("rePassword")?.value){
 return null;
}else{
  return {mismatch:true}
}
}


// c:object={'is-valid':!this.registerform.get('name')?.errors&&(this.registerform.get('name')?.touched||this.registerform.get('name')?.dirty),
//   'is-invalid':this.registerform.get('name')?.errors&&(this.registerform.get('name')?.touched||this.registerform.get('name')?.dirty)}








}
