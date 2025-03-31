import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { Discount } from '../../models/discount';
import { DiscountService } from '../../services/discount.service';
import { ProductDiscount } from '../../models/product-discount';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {

  @Input() productId!: number;
  @Input() discountId!:number;
  ProductEntity!: Product;
  DiscountEntity!:Discount;
  ProductAverageRate!: number[];
  constructor(private productServ:ProductService,private discountServ:DiscountService) { }
  ngOnInit() {
    if(this.discountId > 0 ){
      this.discountServ.getDiscountById(this.discountId).subscribe(res=>{
        this.DiscountEntity=res;
      })
    }
    this.productServ.getProductById(this.productId).subscribe(res=>{
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
  getPriceAfterDiscount(){
    let discountPercentage=this.DiscountEntity.discountPercentage
    let PriceAfterDiscount= Number(this.ProductEntity.productPrice)- (Number(this.ProductEntity.productPrice) * (Number(discountPercentage)/100))
    return PriceAfterDiscount;
  }
  
}
