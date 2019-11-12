import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.scss']
})
export class LoadingAnimationComponent {
  /** The data for all the circle svgs */
  circles = [
    { r: "45", stroke: "#9acd32" },
    { r: "35", stroke: "#800080" },
    { r: "25", stroke: "#52adce" },
    { r: "15", stroke: "#FF9C00" },
  ]
}
