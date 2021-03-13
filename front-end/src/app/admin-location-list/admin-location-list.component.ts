import { Component, OnInit } from '@angular/core';
import { LocationInfoService } from '../location-info.service';
import { Location } from '../location';
import { Admin } from '../admin';
//import { resetComponentState } from '@angular/core/src/render3/state';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
var alertify = require('alertifyjs');

@Component({
  selector: 'app-admin-location-list',
  templateUrl: './admin-location-list.component.html',
  styleUrls: ['./admin-location-list.component.css']
})
export class AdminLocationListComponent implements OnInit {

  constructor(
    private locationInfoService: LocationInfoService,
    private authenticationService: AuthenticationService,
    private router: Router
) { }

  public locationList: Location[];
  public admin: Admin;

  ngOnInit() {
    if ( this.authenticationService.isLoggedIn() ) {
      this.getLocations();
    } else {
      this.router.navigateByUrl('admin/login');
    }
  }

  
  public getLocations(): void {
    this.locationInfoService.adminLocations().then(locations => this.locationList = locations);
    console.log("GET LOCATIONS", this.locationList);
  }
  public deleteLocation(id: string): void {
    var temp = this;
    var otherTemp = location;
    alertify.confirm("Delete location?", //title
      "This action cannot be undone.", //message
      async function () {
        let deleted = null;
        await temp.locationInfoService.adminDeleteLocation(id).then(results => deleted = results);
        if ( deleted.status == 204 ) {
          otherTemp.reload();
          alertify.success("Location deleted");
          console.log("DELETED VALUE", deleted);
        } else {
          alertify.error("There was a problem.\nThe location was not deleted.")
        }
      },
      function () {
        alertify.error("Cancelled");
      });
  }

  public adminLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('admin/login');
  }

}
