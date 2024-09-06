
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  private _AuthService=inject(AuthService);
  private _Router=inject(Router);

  step:number=1;

verifyemail:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})
verifycode:FormGroup=new FormGroup({
  resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
})
resetpassword:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern(/^\w{6,}$/)]),
})

verifyemailsubmit():void{
this._AuthService.setemailverify(this.verifyemail.value).subscribe({
  next:(res) =>{
    console.log(res)

    if(res.statusMsg==='success'){
     
    
        this.step=2;
        
    }
  },
  error:(err) =>{
    console.log(err)
  }
})
let emailvalue=this.verifyemail.get('email')?.value;
this.resetpassword.get('email')?.patchValue(emailvalue)
}
verifycodesubmit():void{
 
this._AuthService.setcodeverify(this.verifycode.value).subscribe({
   
  next:(res) =>{
 
    console.log(res)
  
    if(res.status==='Success'){
      

        this.step=3;
  
     
    }
  },
  error:(err) =>{
    console.log(err);
   
  }
})
}
resetpasswordsubmit():void{
this._AuthService.setresetpassword(this.resetpassword.value).subscribe({
  next:(res) =>{
    console.log(res)
   
localStorage.setItem("usertoken",res.token);
this._AuthService.savedata();
this._Router.navigate(["/home"]);

  

  },
  error:(err) =>{
    console.log(err)
  }
})
}





}
