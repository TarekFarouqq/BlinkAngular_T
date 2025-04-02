import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { ChildCategoriesComponent } from './components/child-categories/child-categories.component';


export const routes: Routes = [

    {path:'',redirectTo:'Homepage',pathMatch:'full'},
    {path:'Homepage',component:HomepageComponent},
    {path:'details/:id',component:ProductDetailsComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'cart',component:CartComponent},
    {path:'child-categories/:id',component:ChildCategoriesComponent},
    {path:'**',redirectTo:'Homepage',pathMatch:'full'}


];
