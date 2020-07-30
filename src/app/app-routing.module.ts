import { AboutLocationComponent } from './pages/about-location/about-location.component';
import { CovidDetailComponent } from './pages/covid-detail/covid-detail.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import { UserinfoComponent } from './pages/userinfo/userinfo.component';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'userinfo', component: UserinfoComponent ,children : [
    { path: 'home', component: DashboardComponent },
    { path: 'contact', component: ContactUsComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'covid', component: CovidDetailComponent },
    { path: 'location', component: AboutLocationComponent },
    { path: '', component: DashboardComponent },
  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
