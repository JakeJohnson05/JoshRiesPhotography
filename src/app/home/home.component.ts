import { Component, HostListener } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private deviceDetectorService: DeviceDetectorService
  ) { }
  @HostListener('window:scroll')
  scrollY = () => ({ float: window.scrollY, int: Math.round(window.scrollY) });
  
  /** Check if the device is a mobile device */
  get isMobile(): any { return this.deviceDetectorService.isMobile() }
}
