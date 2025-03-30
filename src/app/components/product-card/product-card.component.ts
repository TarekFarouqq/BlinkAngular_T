import { Component, Input, OnInit } from '@angular/core';
import { BackendAPIService } from '../../services/backend-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {

  @Input() productId!: number;
  ProductEntity!: any;
  ProductAverageRate!: number[];
  constructor(private apiSer: BackendAPIService) { }
  ngOnInit() {
    this.getProductDetails();
    this.setProductAverageRate();
  }
  getProductDetails() {
    this.apiSer.GetEntityById(`Product/GetById`, this.productId).subscribe(res => {
      this.ProductEntity = res;
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
