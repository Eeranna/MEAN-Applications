import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import * as c3 from 'c3';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-top5-locations-by-headcount',
  templateUrl: './top5-locations-by-headcount.component.html',
  styleUrls: ['./top5-locations-by-headcount.component.css']
})
export class Top5LocationsByHeadcountComponent implements OnInit {
  locationsbyheadcountData: Array<any>;
  locationsbyheadcountArray: Array<any> = [];
  constructor(private _dataService: DataService, private headerService: HeaderService) { }

  ngOnInit() {
    this._dataService.getLocationsBySow()
      .subscribe((res) => {
        this.locationsbyheadcountData = res;
         for (let i = 0; i < this.locationsbyheadcountData.length; i++) {
            this.locationsbyheadcountArray.push([this.locationsbyheadcountData[i]._id, this.locationsbyheadcountData[i].Budget, this.locationsbyheadcountData[i].Actuals]);
          }
        console.log(this.locationsbyheadcountArray);
        this.generateLocationsBySowChart();
      });
  }
  generateLocationsBySowChart() {
    console.log('chart generating..');
    const top5locationsbyheadcountchart = c3.generate({
      bindto: '#top5locationsbyheadcountchart',
      data: {
        columns: this.locationsbyheadcountArray,
        type: 'donut'
      }
    });
  }
}