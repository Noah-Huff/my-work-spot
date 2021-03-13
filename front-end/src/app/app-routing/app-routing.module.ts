import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminLocationListComponent } from '../admin-location-list/admin-location-list.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'location/:locationid',
    component: DetailsComponent
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/location',
    component: AdminLocationListComponent
  },
  {
    path: 'admin/location/add',
    component: AddLocationComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
