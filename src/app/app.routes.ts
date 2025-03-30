import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    {path:'',redirectTo:'Homepage',pathMatch:'full'},
    { path: 'details/:id', component: ProductDetailsComponent },
    {path:'Homepage',component:HomepageComponent},
    {path:'**',redirectTo:'Homepage',pathMatch:'full'}
];
