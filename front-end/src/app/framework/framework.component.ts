import { Component, OnInit } from '@angular/core';
import { Router, 
RouterEvent,
NavigationStart,
NavigationEnd,
NavigationCancel,
NavigationError } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  public showOverlay = true;

  constructor( private router: Router ) { 
    router.events.subscribe((event:RouterEvent) => {
      this.navigationInterceptor(event)
    });
  }

  navigationInterceptor( event: RouterEvent ) {
    if ( event instanceof NavigationStart ) {
      this.showOverlay = true;
    }
    if ( event instanceof NavigationEnd ) {
      this.showOverlay = false;
    }
    if ( event instanceof NavigationCancel ) {
      this.showOverlay = false;
    }
    if ( event instanceof NavigationError ) {
      this.showOverlay = false;
    }
  }


  ngOnInit() {
  }

}
