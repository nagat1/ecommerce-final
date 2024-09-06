import { Routes } from '@angular/router';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CartComponent } from './components/cart/cart.component';
import { CashComponent } from './components/cash/cash.component';
import { DetailsComponent } from './components/details/details.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { BlanklayoutComponent } from './layouts/blanklayout/blanklayout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    {path:'',component:AuthlayoutComponent,canActivate:[logedGuard],children:[
        {path:"",redirectTo:"login",pathMatch:'full'},
        {path:'login',component:LoginComponent},
        {path:'register',component:RegisterComponent},
        {path:'forgot',component:ForgotpasswordComponent},
    ]},
    {path:'',component:BlanklayoutComponent,canActivate:[authGuard],children:[
        {path:"",redirectTo:"home",pathMatch:'full'},
        {path:'home',component:HomeComponent},
        {path: 'brands',loadComponent: () =>import('./components/brands/brands.component').then(m => m.BrandsComponent), },
        {path: 'categories',loadComponent: () =>import('./components/categories/categories.component').then(m => m.CategoriesComponent),},
        {path:'cart',component:CartComponent},
        {path:'wishlist',component:WishlistComponent},
        {path:'products',component:ProductsComponent},
        {path:'details/:id',component:DetailsComponent},
        {path:'allorders',component:AllordersComponent},
        {path:'order/:id',component:OrderComponent},
        {path:'cash',component:CashComponent},
       
    ]},
        {path:"**",component:NotfoundComponent}
];
