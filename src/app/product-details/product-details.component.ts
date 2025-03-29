import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Carousel } from 'bootstrap';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements AfterViewInit {
  @ViewChild('mainCarousel') carouselElement: any;
  @ViewChild('thumbnailContainer') thumbnailContainer!: ElementRef;
  carousel: Carousel | undefined;
  
  images = [
    { 
      main: '../../assets/images/p1.jpeg',
      thumb: '../../assets/images/p1.jpeg'
    },
    {
      main: '../../assets/images/p2.jpeg',
      thumb: '../../assets/images/p2.jpeg'
    },
    {
       main: '../../assets/images/p3.jpeg',
      thumb: '../../assets/images/p3.jpeg'
    },
    {
      main: '../../assets/images/p4.jpeg',
     thumb: '../../assets/images/p4.jpeg'
   },
   {
    main: '../../assets/images/p5.jpeg',
   thumb: '../../assets/images/p5.jpeg'
 }, { 
  main: '../../assets/images/p6.jpeg',
  thumb: '../../assets/images/p6.jpeg'
},
{
  main: '../../assets/images/p7.jpeg',
  thumb: '../../assets/images/p7.jpeg'
}
  ];

  activeIndex = 0;
  showArrows = false;

  ngAfterViewInit() {
    this.carousel = new Carousel(this.carouselElement.nativeElement, {
      interval: false,
      wrap: true
    });
    
     // Add event listener for slide completion
     this.carouselElement.nativeElement.addEventListener('slid.bs.carousel', (event: any) => {
      this.activeIndex = event.to;
    });
    // Check if we need to show arrows
    setTimeout(() => {
      this.showArrows = this.images.length > 4;
    });
  }

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
      behavior: 'smooth'
    });
  }

  private scrollToThumbnail(index: number) {
    const container = this.thumbnailContainer.nativeElement;
    const thumbnails = container.children;
    if (thumbnails[index]) {
      thumbnails[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }

  getStars(rating: number | undefined): number[] {
    return Array(Math.round(rating ?? 0)).fill(0);
  }
}