import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {HeaderService} from '../../services/header.service';
import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-top5-vendors-by-headcount',
  templateUrl: './top5-vendors-by-headcount.component.html',
  styleUrls: ['./top5-vendors-by-headcount.component.css']
})
export class Top5VendorsByHeadcountComponent implements OnInit {
  vendorsbyspendData: Array<any>;
  vendorsbyspendArray: Array<any> = [];
  constructor(private _dataService: DataService, private headerService: HeaderService) { }

  ngOnInit() {
    this._dataService.getVendorsBySow()
      .subscribe((res) => {
        this.vendorsbyspendData = res;
        for (let i = 0; i < this.vendorsbyspendData.length; i++) {
            this.vendorsbyspendArray.push([this.vendorsbyspendData[i]._id, this.vendorsbyspendData[i].Budget, this.vendorsbyspendData[i].Actuals]);
          }
        console.log(this.vendorsbyspendArray);
        this.generateTop5VendorsByHeadcountChart();
      });
  }
  generateTop5VendorsByHeadcountChart() {
    console.log('Top5VendorsByHeadcountChart generating..');
    const top5vendorsbyheadcount = c3.generate({
      bindto: '#top5vendorsbyheadcount',
      data: {
        columns: this.vendorsbyspendArray,
        type: 'pie'
      }
    });
  }
}
