import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CategoryCardComponent } from "../category-card/category-card.component";
@Component({
  standalone: true,
  selector: 'app-homepage',
  imports: [FormsModule, CommonModule, ProductCardComponent, CategoryCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  ProductArr!:Product[];
  constructor(private productServ:ProductService) { }
  ngOnInit() {
    this.productServ.getAllProducts().subscribe(res=>{
      this.ProductArr=res;
    })
  }
}
