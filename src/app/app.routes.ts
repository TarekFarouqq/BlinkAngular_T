import { Routes } from '@angular/router';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'details', component: ProductDetailsComponent },
    {path:'register',component:RegisterComponent},

];
