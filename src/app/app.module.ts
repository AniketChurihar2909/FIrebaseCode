import { CovidService } from './services/covid.service';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from './services/dialog.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// import firebase module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {environment} from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserinfoComponent } from './pages/userinfo/userinfo.component';
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './pages/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MaterialModule } from './material.module';
import { NotificationService } from './services/notification.service';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MatConfirmDialogComponent } from './pages/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CovidDetailComponent } from './pages/covid-detail/covid-detail.component';
import { AgmCoreModule } from '@agm/core';
import { AboutLocationComponent } from './pages/about-location/about-location.component';
import { CookieComponent } from './pages/cookie/cookie.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserinfoComponent,
    NavComponent,
    DashboardComponent,
    ContactUsComponent,
    AboutUsComponent,
    MatConfirmDialogComponent,
    CovidDetailComponent,
    AboutLocationComponent,
    CookieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GoogleMapApiKey.apiKey
    })

  ],
  providers: [TranslateService,NotificationService,DialogService,AuthService,CovidService,
    {provide: MatDialogRef, useValue: {}},
  ],
  bootstrap: [AppComponent],
  entryComponents:[ContactUsComponent,MatConfirmDialogComponent]
})
export class AppModule { }
