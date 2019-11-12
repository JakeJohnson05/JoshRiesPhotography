import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  /** Array of all the routes for the page */
  routes = [
    { path: '/', title: "Home" },
    { path: '/portfolio', title: "Portfolio" },
    { path: '/contact', title: "Contact" },
  ]
}
