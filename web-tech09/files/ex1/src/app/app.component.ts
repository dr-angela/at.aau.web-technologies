import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  applicationName = 'ex1';
  products: Product[];

  constructor() {
    this.products = [
      new Product('Green Tea', ['Beverage', 'Drink'], 4),
      new Product('Berry Tea', ['Beverage', 'Drink'], 7),
      new Product ('Tea Mug', ['Kitchen', 'Drinkware'], 1),
      new Product('Water Bottle', ['Kitchen', 'Drinkware']) //with zero likes
    ];
  }
}
