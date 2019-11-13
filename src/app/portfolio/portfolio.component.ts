import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  /** Contains all of the image routes */
  images = [
    { path: '/assets/jrp-foggy-lake.JPG' },
    { path: '/assets/jrp-bamboo-forest.jpg' },
    { path: '/assets/jrp-bird-landing.JPG' },
    { path: '/assets/jrp-castle.jpeg' },
    { path: '/assets/jrp-foreign-life.JPG' },
    { path: '/assets/jrp-fountain-art.JPG' },
    { path: '/assets/jrp-lightning-gate-shrine.JPG' },
    { path: '/assets/jrp-misty-mtns.jpeg' },
    { path: '/assets/jrp-night-cityscape.JPG' },
    { path: '/assets/jrp-red-moon.JPG' },
    { path: '/assets/jrp-waterfall-hole.jpg' },
    { path: '/assets/jrp-wildgrass-mtns.jpg' },
    { path: '/assets/jrp-japan-life.JPG' },
  ];

  /** Add the event listener for window scrolling and get scrollY */
  @HostListener('window:scroll')
  windowRef = () => ({ scrollY: Math.round(window.scrollY), innerHeight: Math.round(window.innerHeight) });

  /** Calculate the style.top value for a column */
  calcColTop(missingHeight: number, windowScrollY: number): string {
    if (missingHeight < 1 || windowScrollY < 100) return '0px';
    if ((windowScrollY - 100) / 2 > missingHeight) return `${missingHeight}px`
    return `${(windowScrollY - 100) / 2}px`;
  }
}
