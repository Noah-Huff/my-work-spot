import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { getLocaleCurrencyName } from '@angular/common';
import { Location } from './location';
import { environment } from '../environments/environment';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';
import { Admin } from './admin';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = environment.apiBaseURL;

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    const maxDistance: number = 40000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    
    return this.http
    .get(url)
    .toPromise()
    .then(response => response as Location[])
    .catch(this._handleError);
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http
    .get(url)
    .toPromise()
    .then(response => response as Location)
    .catch(this._handleError);
  }


  public login(admin: Admin): Promise<AuthResponse> {
    return this._makeAuthApiCall('admin/login', admin);
  }

  public register(admin: Admin): Promise<AuthResponse> {
    return this._makeAuthApiCall('register', admin);
  }
  
  private _makeAuthApiCall(urlPath: string, admin: Admin): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
    .post(url, admin)
    .toPromise()
    .then(response => response as AuthResponse)
    .catch(this._handleError);
  }
  private _handleError(error: any): Promise<any> {
    /*if (error instanceof Error) {
      console.error('An error occurred', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }*/
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}

