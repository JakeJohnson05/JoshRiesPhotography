import { Component, HostListener } from '@angular/core';

class WindowRef { scrollY: number; innerHeight: number }

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
    { path: '/assets/jrp-japan-life.JPG' }
  ];

  /** Add the event listener for window scrolling and get scrollY */
  @HostListener('window:scroll')
  windowRef = (): WindowRef => ({ scrollY: window.scrollY, innerHeight: window.innerHeight });

  /** Calculate the style.top value for a column */
  calcColTop(outerCtnHeight: number, selfHeight: number, { scrollY, innerHeight }: WindowRef): number {
    let diff = outerCtnHeight - selfHeight;
    if (diff <= 0 || scrollY <= 100) return 0;
    return ((scrollY - 100) * diff) / (outerCtnHeight - innerHeight);
  }
}
