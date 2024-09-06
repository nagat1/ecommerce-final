import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { Icategory, subcat } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly _CategoriesService=inject(CategoriesService);

  
  getallproductssub!:Subscription;

  categorylist:Icategory[]=[];
  subcatlist:subcat[]=[];
  ///////////////////////
  ngOnInit(): void {
   
    this._CategoriesService.getallcategories().subscribe({
      next:(res)=> {
        console.log(res.data)
        console.log("categories")
        this.categorylist=res.data;
      },
      error:(err)=> {
        console.log(err)
      },
    })
  
  }

  // displaycatproucts(productid:string){
  //   this._CategoriesService.getspecificcategory(productid).subscribe({
  //     next:(res)=> {
  //       console.log(res.data);
  //       console.log("catproducts");
      
  //     },
   
  //   })
  
  // }
  displaysub(id:string){
    this._CategoriesService.getsub(id).subscribe({
      next:(res)=> {
        console.log(res);
        this.subcatlist=res.data
        console.log("suuuubproducts");
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
