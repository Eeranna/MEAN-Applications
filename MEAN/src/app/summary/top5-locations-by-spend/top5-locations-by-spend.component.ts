import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../services/header.service';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-top5-locations-by-spend',
  templateUrl: './top5-locations-by-spend.component.html',
  styleUrls: ['./top5-locations-by-spend.component.css']
})
export class Top5LocationsBySpendComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  locationsbyspendData: Array<any>;
  locationsbyspendKeys: Array<String> = [];
  locationsbyspendArray: any [][];
  locationsbyspendcategoryArray: any [];
  constructor(private _dataService: DataService, private headerService: HeaderService) { }
  ngOnInit() {
    this._dataService.getLocationsBySpend()
      .subscribe((res) => {
        this.locationsbyspendData = res;
        for(let k in this.locationsbyspendData[0]) {
          this.locationsbyspendKeys.push(k);
        }
        this.locationsbyspendArray = [];
        for(let ik = 0; ik < this.locationsbyspendKeys.length; ik++) {
          const budgetKeyName: any = this.locationsbyspendKeys[ik];
          this.locationsbyspendArray[ik] = [];
          for(let id = 0; id < this.locationsbyspendData.length; id++) {
            this.locationsbyspendArray[ik][id] = this.locationsbyspendData[id][budgetKeyName];
          }
          this.locationsbyspendArray[ik].splice(0, 0, budgetKeyName);
        }
        this.locationsbyspendcategoryArray = this.locationsbyspendArray[0];
        this.locationsbyspendcategoryArray.splice(0,1);
        this.locationsbyspendArray.splice(0,1);
        console.log(this.locationsbyspendArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          this.generateLocationsBySpendCurrencyChart(this.currency);
        });
        this.generateLocationsBySpendChart();
      });
    }
  generateLocationsBySpendChart() {
    console.log('chart generating..');
    const locationsBySpend = c3.generate({
      bindto: '#locationsBySpend',
      size: {
        height: 280
      },
      data: {
        columns: this.locationsbyspendArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.locationsbyspendcategoryArray
        },
        y : {
          tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
  generateLocationsBySpendCurrencyChart(currency) {
    console.log('chart generating..');
    const locationsBySpend = c3.generate({
      bindto: '#locationsBySpend',
      size: {
        height: 280
      },
      data: {
        columns: this.locationsbyspendArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.locationsbyspendcategoryArray
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
}
