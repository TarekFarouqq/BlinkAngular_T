import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-child-categories',
  imports: [ProductCardComponent],
  templateUrl: './child-categories.component.html',
  styleUrl: './child-categories.component.css'
})
export class ChildCategoriesComponent implements OnInit {
  ParentCategoryId!:number;
  ParentCategoryEntity!:Category;
  ChildCategoryArr!:Category[];
  productMap: { [categoryId: number]: Product[] } = {};
  constructor(private categoryServ:CategoryService,private productServ:ProductService,private routes:ActivatedRoute){}
  ngOnInit() {
    this.routes.paramMap.subscribe(value=>{
      this.ParentCategoryId=Number(value.get('id'));
      this.categoryServ.getParentCategoryById(this.ParentCategoryId).subscribe(res=>{
        this.ParentCategoryEntity=res;
      })
      this.categoryServ.getChildCategoriesByParentId(this.ParentCategoryId).subscribe(childRes=>{
        this.ChildCategoryArr=childRes;
        this.ChildCategoryArr.forEach((category)=>{
          this.getProductsWithCategoryId(category.categoryId);
        })
      })
    })
  }
  getProductsWithCategoryId(id:number):Product[]|void{
    this.productServ.getProductsWithCategoryId(id).subscribe(res=>{
      this.productMap[id]=res;
    })
  }
}
