import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dropdown } from 'bootstrap';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  constructor(private _AuthService:AuthService) { }
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

  LoggedOut(): void {
    this._AuthService.Logout();
   
  }
}
