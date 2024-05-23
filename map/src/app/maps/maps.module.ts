import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapComponent } from './map/map.component';
import { MapsRoutingModule } from './maps-routing.module';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
