import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Carousel } from 'bootstrap';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements AfterViewInit, OnInit {
  @ViewChild('mainCarousel') carouselElement: any;
  @ViewChild('thumbnailContainer') thumbnailContainer!: ElementRef;
  carousel: Carousel | undefined;
  activeIndex = 0;
  showArrows = false;
  images: { main: string; thumb: string }[] = [];
  product: Product | null = null;
  productId!: number;
  cartItem! : CartItem
  uxQuantity: number = 1 ;

  constructor(private router: Router, private productService: ProductService,private route: ActivatedRoute, private cartService: CartService ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadProduct();
    
  }

  addProductToCart() {
    if (this.product) {
      this.cartItem = {
        productId: this.product.productId,
        quantity: this.uxQuantity,
      }
      this.cartService.addToCart(this.cartItem);
       Swal.fire({
              title: 'Product Added To Cart !',
              icon: 'success',
              width: 400,
              showCancelButton: true,
              confirmButtonText: 'Checkout',
              confirmButtonColor: '#d33',
              cancelButtonText: 'Continue Shopping',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/cart']); 
              }
            });
    }
  }


  increamentQuantity() {
    if (this.product && this.uxQuantity >= this.product.stockQuantity) {
      return;
    }
    this.uxQuantity = this.uxQuantity + 1;
  }
  
  decreamentQuantity() {
    if (this.uxQuantity <= 1) {
      return;
    }
    this.uxQuantity = this.uxQuantity - 1;
  }
  
  ngAfterViewInit() {
    this.carousel = new Carousel(this.carouselElement.nativeElement, {
      interval: false,
      wrap: true,
    });

    // Add event listener for slide completion
    this.carouselElement.nativeElement.addEventListener(
      'slid.bs.carousel',
      (event: any) => {
        this.activeIndex = event.to;
      }
    );
    // Check if we need to show arrows
    setTimeout(() => {
      this.showArrows = this.images.length > 4;
    });
  }

  private loadProduct(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.productService.getProductWithRunningDiscountByProductId(this.productId).subscribe({
        next: (product) => {
          this.product = product;
          console.log(this.product);
          this.images = this.product.productImages.map((imgPath) => ({
            main: imgPath,
            thumb: imgPath,
          }));
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  getStars(rating: number | undefined): number[] {
    return Array(Math.round(rating ?? 0)).fill(0);
  }

  // Galleria Logic
  selectImage(index: number) {
    this.activeIndex = index;
    this.carousel?.to(index);
    this.scrollToThumbnail(index);
  }
  scrollThumbnails(direction: 'left' | 'right') {
    const container = this.thumbnailContainer.nativeElement;
    const scrollAmount = 200; // Adjust this value as needed
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
  private scrollToThumbnail(index: number) {
    const container = this.thumbnailContainer.nativeElement;
    const thumbnails = container.children;
    if (thumbnails[index]) {
      thumbnails[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }
}
