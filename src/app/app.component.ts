import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NewNavbarComponent } from "./components/new-navbar/new-navbar.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NewNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blink-Angular';
}
