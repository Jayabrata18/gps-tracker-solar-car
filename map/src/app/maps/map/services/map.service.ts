import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private httpCLient: HttpClient) {}

  fetchChargingStations() {
    return this.httpCLient.get('assets/stub-data/chargingStations.json');
  }


  fetchLocation() {
    return this.httpCLient.get("/info/1");
  }

}
