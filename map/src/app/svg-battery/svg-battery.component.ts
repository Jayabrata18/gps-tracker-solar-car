import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-battery',
  templateUrl: './svg-battery.component.html',
  styleUrl: './svg-battery.component.scss'
})
export class SvgBatteryComponent {
  @Input() value:number = 0;
}
