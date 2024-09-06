import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
  _AuthService=inject(AuthService);
  private _CartService=inject(CartService);
  countnumber:number=0;
ngOnInit(): void {
  this._CartService.getproductscart().subscribe({
    next:(res)=>{
      console.log('caretitems',res)
      this._CartService.cartnumber.next(res.numOfCartItems);
    }
  })
  // ///////
  this._CartService.cartnumber.subscribe({
next:(data)=>{
  this.countnumber=data;
}
  })

}




}
