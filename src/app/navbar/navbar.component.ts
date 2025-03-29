import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Dropdown } from 'bootstrap';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('dropdownButton', { static: false }) dropdownElement!: ElementRef;
  dropdown!: Dropdown;
  isHidden = false;
  lastScrollTop = 0;

  ngAfterViewInit() {
    this.dropdown = new Dropdown(this.dropdownElement.nativeElement);
  }

  toggleDropdown() {
    this.dropdown.toggle();
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > this.lastScrollTop) {
      // Scrolling down -> Hide navbar
      this.isHidden = true;
    } else {
      // Scrolling up -> Show navbar
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Avoid negative values
  }
}
