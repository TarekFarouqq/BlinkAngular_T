import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ProductDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blink-Angular';
}
