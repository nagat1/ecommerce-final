import { Component, inject } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { PaymentService } from '../../core/services/payment.service';
import { AuthService } from '../../core/services/auth.service';
import { ordercash } from '../../core/interfaces/cash';
@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.scss'
})
export class CashComponent {
  private _PaymentService=inject(PaymentService)
  private _AuthService=inject(AuthService)
  orderdetailsonline:ordercash[]=[];


  ngOnInit(): void {

  }








}
