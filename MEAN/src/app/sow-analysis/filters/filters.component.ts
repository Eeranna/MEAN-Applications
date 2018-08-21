import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {HeaderService} from '../../services/header.service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  countryData: Array<any>;
  constructor(private _dataService: DataService, private headerService: HeaderService) { }

  ngOnInit() {
    this._dataService.getCountry()
      .subscribe(
        (response) => {
          this.countryData = response;
          console.log(this.countryData)
        });
     }
  onSelect(currency: string) {
    console.log('selected currency inside HeaderComponent : ', currency);
    this.headerService.onSelect(currency);
  }
 }
