import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { stationMarker, userMarker } from './icons/user-location';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  showPopup: boolean = false;
  private map: any;
  private center: any = [22.57631593318771, 88.4280334698181];

  constructor(private mapService: MapService) {}
  private initMap(): void {
    this.map = L.map('map', {
      center: this.center,
      zoom: 15,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>'",
      },
    );

    L.marker(this.center, { icon: userMarker }).addTo(this.map);

    tiles.addTo(this.map);
  }

  private makerOnClick(e: any) {}
  addChargingStations() {
    L.circle(this.center, 1000).addTo(this.map);
    this.mapService.fetchChargingStations().subscribe((res: any) => {
      res.data.forEach((element: any) => {
        L.marker(element, { icon: stationMarker })
          .on('click', this.makerOnClick)
          .addTo(this.map);
      });
    });
  }

  ngAfterViewInit(): void {
    this.mapService.fetchLocation().subscribe((res : any) => {
      this.center = [res.row[0]['latitude'],res.row[0]['longitude']];
      this.initMap();
    })
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  showPathtoStation() {
    this.addChargingStations();
    const route = L.Routing.control({
      waypoints: [
        L.latLng(this.center),
        L.latLng(22.57223761657267, 88.4260422255439),
      ],
    });
    route.addTo(this.map);
  }
}
