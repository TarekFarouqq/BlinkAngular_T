import { Component } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CategoryCardComponent } from "../category-card/category-card.component";
import { BackendAPIService } from '../../services/backend-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [FormsModule, CommonModule, ProductCardComponent, CategoryCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  FullProductList!:any;
  constructor(private apiServ: BackendAPIService) { 
    this.apiServ.GetEntity('Product').subscribe(res=>{
      this.FullProductList=res;
    })
  }
}
