import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header.service';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  countryData: Array<any>;
  descriptionData: Array<any>;
  constructor(private dataService: DataService, private headerService: HeaderService, public router: Router) {}
  ngOnInit() {
    this.router.navigate(['/summary']);
    this.dataService.getCountry()
      .subscribe(
        (response) => {
          this.countryData = response;
          console.log(this.countryData);
        });
    this.dataService.getDescription()
      .subscribe(
        (response) => {
          this.descriptionData = response;
          console.log(this.descriptionData);
        });
  }
  onSelect(currency: string) {
    console.log('selected currency inside HeaderComponent : ', currency);
    this.headerService.onSelect(currency);
  }
}
