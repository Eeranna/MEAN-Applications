import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {HeaderService} from '../../services/header.service';
import * as c3 from 'c3';
import * as d3 from 'd3';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-totalsow',
  templateUrl: './totalsow.component.html',
  styleUrls: ['./totalsow.component.css']
})
export class TotalsowComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  agData: Array<any>;
  agKeys: Array<String> = [];
  countryData: Array<any>;
  data: any [][] ;
  columns: any [][];
  sowArray: any [];
  constructor(private _dataService: DataService, private headerService: HeaderService) { }

  ngOnInit() {
    this._dataService.getPV_STMT_WORK_CNTGNT_WRKR()
      .subscribe(
        (response) => {
          this.agData = response;
          console.log(this.agData)
          for(var k in this.agData[0]) {
            this.agKeys.push(k);
          }
          this.columns = [];
          for(let i = 0; i < this.agKeys.length; i++) {
            const keyName: any = this.agKeys[i];
            this.columns[i] = [];
            for(let j = 0; j < this.agData.length; j++){
              this.columns[i][j] = this.agData[j][keyName];
            }
            this.columns[i].splice(0, 0, keyName);
          }
          this.sowArray = this.columns[0];
          this.sowArray.splice(0,1);
          this.columns.splice(0,1);
          console.log(this.columns);
          this.subscription = this.headerService.getSelect().subscribe(currency => {
            this.currency = currency;
            console.log(this.currency);
            this.generateBarChart(this.currency);
          });
          this.generateBarChart1();
        });

    this._dataService.getCountry()
      .subscribe(
        (response) => {
          this.countryData = response;
          console.log(this.countryData)
        });

  }
  generateBarChart(currency) {
    console.log('chart bar generating..');
    const aggregatechart = c3.generate({
      bindto: '#aggregatechart',
      data: {
        columns : this.columns,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.sowArray
        },
        y: {
          tick: {
            format: function (d) {
              console.log(currency);
              if (currency === 'USA') {
                return d3.format('$,.3s')(d);
              } else if (currency === 'POL') {
                return '₹' + d3.format('.3s')(d);
              } else if (currency === 'UNK') {
                return '¥' + d3.format('.3s')(d);
              } else if (currency === 'CMR') {
                return 'C$' + d3.format('.3s')(d);
              }
            }
          }
        }
      }
    });
  }
  generateBarChart1() {
    console.log('chart bar generating..');
    const aggregatechart = c3.generate({
      bindto: '#aggregatechart',
      data: {
        columns : this.columns,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.sowArray
        },
        y : {
          tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
}
