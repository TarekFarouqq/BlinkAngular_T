import { Routes } from '@angular/router';
<<<<<<< HEAD

import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'details', component: ProductDetailsComponent },
    {path:'register',component:RegisterComponent},

=======
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    {path:'',redirectTo:'Homepage',pathMatch:'full'},
    { path: 'details/:id', component: ProductDetailsComponent },
    {path:'Homepage',component:HomepageComponent},
    {path:'**',redirectTo:'Homepage',pathMatch:'full'}
>>>>>>> e0df6a1ad67e452712f8bde48410c50558091ed9
];
