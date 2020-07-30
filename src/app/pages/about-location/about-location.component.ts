import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-location',
  templateUrl: './about-location.component.html',
  styleUrls: ['./about-location.component.css']
})
export class AboutLocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lat = 22.5505;
  lng = 75.7625;

  OnchooseLocation(event){
this.lat = event.coords.lat;
this.lng = event.coords.lng;
  }

}
