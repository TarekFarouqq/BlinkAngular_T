import { Routes } from '@angular/router';
 

import { RegisterComponent } from './register/register.component';

import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:'',redirectTo:'Homepage',pathMatch:'full'},
    {path:'Homepage',component:HomepageComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},

    { path: 'details/:id', component: ProductDetailsComponent },
    {path:'**',redirectTo:'Homepage',pathMatch:'full'}

];
