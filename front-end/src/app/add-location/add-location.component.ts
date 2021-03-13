import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
import { LocationInfoService } from '../location-info.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { constructorParametersDownlevelTransform } from '@angular/compiler-cli';
var alertify = require('alertifyjs');

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  //newLocation: Location;


  public location = {
    name: '',
    address: '',
    lat: '',
    lng: '',
    notes: '',
    sunOpen: '',
    sunClose: '',
    monOpen: '',
    monClose: '',
    tueOpen: '',
    tueClose: '',
    wedOpen: '',
    wedClose: '',
    thuOpen: '',
    thuClose: '',
    friOpen: '',
    friClose: '',
    satOpen: '',
    satClose: ''
  };
  public closed = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  }
  public open = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
}

  constructor(
    private locationInfoService: LocationInfoService,
    private router: Router,
    private authenticationService: AuthenticationService,

  ) { }

  ngOnInit() {
    if ( !this.authenticationService.isLoggedIn() ) {
      this.router.navigateByUrl('admin/login');
    }
  }



  public postLocation(): void {
    this._markClosed();
    this._openAllDay();
    console.log("location component postLocation", this.location);
    console.log("CLOSED", closed);
    this.locationInfoService.postLocation(this.location);
    alertify.success("Added Location");
    this._resetForm();
  }

  public backToLocationList(): void {
    this.router.navigateByUrl('admin/location');
  }

  private _openAllDay():void {
    if ( this.open.sunday ) {
      console.log("OPEN", this.open.sunday);
      this.location.sunOpen = '24';
      this.location.sunClose = '24';
    }
    if ( this.open.monday ) {
      this.location.monOpen = '24';
      this.location.monClose = '24';
    }
    if ( this.open.tuesday ) {
      this.location.tueOpen = '24';
      this.location.tueClose = '24';
    }
    if ( this.open.wednesday ) {
      this.location.wedOpen = '24';
      this.location.wedClose = '24';
    }
    if ( this.open.thursday ) {
      this.location.thuOpen = '24';
      this.location.thuClose = '24';
    }
    if ( this.open.friday ) {
      this.location.friOpen = '24';
      this.location.friClose = '24';
    }
    if ( this.open.saturday ) {
      this.location.satOpen = '24';
      this.location.satClose = '24';
    }
  }

  private _markClosed():void { 
    if ( this.closed.sunday ) {
      this.location.sunOpen = '0';
      this.location.sunClose = '0';
    }
    if ( this.closed.monday ) {
      this.location.monOpen = '0';
      this.location.monClose = '0';
    }
    if ( this.closed.tuesday ) {
      this.location.tueOpen = '0';
      this.location.tueClose = '0';
    }
    if ( this.closed.wednesday ) {
      this.location.wedOpen = '0';
      this.location.wedClose = '0';
    }
    if ( this.closed.thursday ) {
      this.location.thuOpen = '0';
      this.location.thuClose = '0';
    }
    if ( this.closed.friday ) {
      this.location.friOpen = '0';
      this.location.friClose = '0';
    }
    if ( this.closed.saturday ) {
      this.location.satOpen = '0';
      this.location.satClose = '0';
    }

  }

  private _resetForm(): void {
    this.location.name = '';
    this.location.address = '';
    this.location.lat = '';
    this.location.lng = '';
    this.location.notes = '';
    this.location.sunOpen = '';
    this.location.sunClose = '';
    this.location.monOpen = '';
    this.location.monClose = '';
    this.location.tueOpen = '';
    this.location.tueClose = '';
    this.location.wedOpen = '';
    this.location.wedClose = '';
    this.location.thuOpen = '';
    this.location.thuClose = '';
    this.location.friOpen = '';
    this.location.friClose = '';
    this.location.satOpen = '';
    this.location.satClose = '';
  }


}
