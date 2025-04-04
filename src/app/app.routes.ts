import { NotfoundComponent } from './components/notfound/notfound.component';
import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './guards/auth.guard';
import { loggedGuard } from './guards/logged.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {path:'',redirectTo:'Homepage',pathMatch:'full'}, 
            {path:'Homepage',component:HomepageComponent},
            {path:'details/:id',component:ProductDetailsComponent},
            {path:'cart',component:CartComponent,canActivate:[authGuard]},
            
        ],
      },
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path:'register',component:RegisterComponent,canActivate:[loggedGuard]},
            {path:'login',component:LoginComponent,canActivate:[loggedGuard]},
        ],
      },
      {path:'**',component:NotfoundComponent}

    
    
    
   


];
