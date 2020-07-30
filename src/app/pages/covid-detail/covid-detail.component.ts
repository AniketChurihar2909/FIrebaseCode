import { CovidService } from "./../../services/covid.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: "app-covid-detail",
  templateUrl: "./covid-detail.component.html",
  styleUrls: ["./covid-detail.component.css"],
})
export class CovidDetailComponent implements OnInit {
  countries: any;
  country = "India";

  listData: MatTableDataSource<any>;
  showDetails : any;
  displayedColumns: string[] = [
    "Confirmed",
    "Recovered",
    "Deaths",
    "Date"
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public covid: CovidService) {}

  ngOnInit(): void {
    this.covid.getCountries().subscribe((data) => {
      var sortData = data.sort(function(a, b) { return a.Variable1 < b.Variable1 ? 1 : -1; })
      this.countries = sortData;
    });
  }

  getCovidData() {
    this.showDetails = true;
    this.covid.getCovidRealTimeData(this.country).subscribe((data) => {
      // console.log(data);
      var index = data.length - 1;
      var top10 = data.sort(function(a, b) { return a.Variable1 < b.Variable1 ? 1 : -1; })
                .slice(0, 10);
      this.listData = new MatTableDataSource(top10);
      this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      //console.log(data[index].Confirmed);
    });
  }

  getCountry(country: any) {
    this.country = country;
  }
}
