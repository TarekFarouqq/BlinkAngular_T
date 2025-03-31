import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() productId!: number;
  ProductEntity!: Product;
  ProductAverageRate!: number[];
  constructor(private productServ:ProductService) { }
  ngOnInit() {
   this.productServ.getProductWithRunningDiscountByProductId(this.productId).subscribe(res=>{
    this.ProductEntity=res;
    this.setProductAverageRate();
   })
  }
  setProductAverageRate() {
    if(this.ProductEntity){
      this.ProductAverageRate = Array(Math.round(this.ProductEntity.averageRate)).fill(1);
    }
  }
  completeEmptyStart(){
    return Array(5 - Math.round(this.ProductEntity.averageRate)).fill(1);
  }
}
