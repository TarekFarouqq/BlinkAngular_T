import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/category.service';
import { DiscountService } from '../../services/discount.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Attribute } from '../../models/attribute';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  imports: [ProductCardComponent,FormsModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  animations: [
    trigger('collapseAnimation', [
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]

})
export class ShopComponent implements OnInit {
  ProductArr!:Product[];
  FilteredProductArr!:Product[];
  ParentCategoryArr!:Category[];
  params = new HttpParams();
  CategoryArr!:Category[];
  attributeArr!:Attribute[];
  selectedAttributes: { [attributeId: number]: string[] } = {};
  collapseStates: { [key: number]: boolean } = {};
  isRatingCollapsed: boolean = false;
  isPriceCollapsed: boolean = false;
  ratingArr : number[] = [0, 1, 2, 3, 4, 5];
  fromPrice!: number ;
  toPrice!: number ;
  rating: number = -1 ;
  CurrentPage: number = 1;
    TotalPages!: number;

  constructor(private productServ:ProductService, private categoryServ:CategoryService, private discountServ:DiscountService) {
  
  }

  ngOnInit() {
    
    this.productServ.getFilteredProducts(this.params,-1,-1,this.CurrentPage,this.rating).subscribe( {
      next:(res)=>{
        this.FilteredProductArr=res;
        console.log(this.FilteredProductArr);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
    this.productServ.GetTotalPages(16).subscribe({
      next:(res)=>{
        this.TotalPages=res;
      }
    })
    this.productServ.getAllAttributes().subscribe(res => {
      this.attributeArr = res;
    });
    this.attributeArr.forEach(att => {
      this.collapseStates[att.attributeId] = false;
    });

  }

  nextPage() {
    this.CurrentPage++;
    if (this.CurrentPage > this.TotalPages) {
      this.CurrentPage = this.TotalPages;
    }

    this.productServ.getFilteredProducts(this.params,this.fromPrice,this.toPrice,this.CurrentPage,this.rating,).subscribe( {
      next:(res)=>{
        this.FilteredProductArr=res;
        console.log(this.FilteredProductArr);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  prevPage() {
    this.CurrentPage--;
    if (this.CurrentPage < 1) {
      this.CurrentPage = 1;
    }

    this.productServ.getFilteredProducts(this.params,this.fromPrice,this.toPrice,this.CurrentPage,this.rating,).subscribe( {
      next:(res)=>{
        this.FilteredProductArr=res;
        console.log(this.FilteredProductArr);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  toggleCollapse(attributeId: number): void {
    this.collapseStates[attributeId] = !this.collapseStates[attributeId];
  }
  toggleRatingCollapse() {
    this.isRatingCollapsed = !this.isRatingCollapsed;
  }
  togglePriceCollapse() {
    this.isPriceCollapsed = !this.isPriceCollapsed;
  }
  getStars(rating: number): string[] {
    return Array(Math.round(Number(rating) )).fill(0);
  }

  onCheckboxChange(attributeId: number, value: string, event: Event) {
    const input = event.target as HTMLInputElement; 
    const checked = input.checked;
  
    if (!this.selectedAttributes[attributeId]) {
      this.selectedAttributes[attributeId] = [];
    }
  
    if (checked) {
      this.selectedAttributes[attributeId].push(value);
    } else {
      this.selectedAttributes[attributeId] = this.selectedAttributes[attributeId].filter(v => v !== value);
    }
  
    let params = new HttpParams();
      Object.entries(this.selectedAttributes).forEach(([key, values]) => {
        values.forEach(value => {
          params = params.append(key, value);
        });
      });

  }

  ApplyFilter(){

    
      Object.entries(this.selectedAttributes).forEach(([key, values]) => {
        values.forEach(value => {
          this.params = this.params.append(key, value);
        });
      });


      this.productServ.getFilteredProducts(this.params,this.fromPrice,this.toPrice,1,this.rating,).subscribe( {
        next:(res)=>{
          this.FilteredProductArr=res;
          console.log(this.FilteredProductArr);
        },
        error:(err)=>{
          console.log(err);
        }
      })

  }

}