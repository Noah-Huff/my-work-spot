import { Component, Input, OnInit, Output, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationInfoService } from '../location-info.service';
import { Location } from '../location';
import { GeolocationService } from '../geolocation.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { EventEmitter } from '@angular/core';
import { faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit {
  doorOpen = faDoorOpen;
  doorClosed = faDoorClosed;


  constructor(private locationInfoService: LocationInfoService,
    private geoLocationService: GeolocationService) { }
  


    public locations: Location[];
    public message: string;


    private _getLocations(position: any): void {
      this.message = "Searching for nearby places";
      const lat: number = position.coords.latitude;
      const lng: number = position.coords.longitude;
      this.locationInfoService.locationsByDistance(lat, lng)
      .then(foundLocations => 
        {
          this.message = foundLocations.length > 0 ? '' : 'No locations found';
          this.locations = foundLocations;
          console.log("THIS LOCATION", this.locations);
          console.log("FRIDAY", this.locations[2].openTimes.fri);
        });
    }

    private _showError(error: any): void {
      this.message = error.message;
    }

    private _noGeo(): void {
      this.message = 'GeoLocation not supported by this browser.';
    }

    private _getPosition(): void {
      this.message = 'Getting your locations...';
      this.geoLocationService.getPosition(this._getLocations.bind(this), this._showError.bind(this), this._noGeo.bind(this));
    }


  ngOnInit() {
    this._getPosition();
  }

}
