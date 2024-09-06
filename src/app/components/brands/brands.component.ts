import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsService } from '../../core/services/brands.service';
import { details, Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly _brandService=inject(BrandsService);

  
  getallproductssub!:Subscription;

  brandlist:Ibrands[]=[];

  branddetails:details={} as details;
  ///////////////////////
  ngOnInit(): void {
   
    this._brandService.getallbrands().subscribe({
      next:(res)=> {
        console.log(res.data);
        console.log("brands");
        this.brandlist=res.data;
      },
   
    })
  
  }
displaybranddetails(productid:string){
  this._brandService.getspecificbrand(productid).subscribe({
    next:(res)=> {
      console.log(res);
      console.log("branddetails");
      this.branddetails=res.data;
    this.display();
    },
 
  })

}
@ViewChild('noga') x!:ElementRef;

display(){
  this.x.nativeElement.classList.remove('d-none')
  this.x.nativeElement.classList.add('d-flex')
}
close(){
  this.x.nativeElement.classList.remove('d-flex')
  this.x.nativeElement.classList.add('d-none')
}







}