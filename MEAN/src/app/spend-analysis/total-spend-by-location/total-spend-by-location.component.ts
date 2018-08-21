import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../services/header.service';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-total-spend-by-location',
  templateUrl: './total-spend-by-location.component.html',
  styleUrls: ['./total-spend-by-location.component.css']
})
export class TotalSpendByLocationComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  totalSpendByLocationData: Array<any>;
  totalSpendByLocationKeys: Array<String> = [];
  totalSpendByLocationArray: any [][];
  locationsbyspendCategoryArray: any [];
  constructor(private _dataService: DataService, private headerService: HeaderService) { }
  ngOnInit() {
    this._dataService.getLocationsBySpend()
      .subscribe((res) => {
        this.totalSpendByLocationData = res;
        for(let k in this.totalSpendByLocationData[0]) {
          this.totalSpendByLocationKeys.push(k);
        }
        this.totalSpendByLocationArray = [];
        for(let ik = 0; ik < this.totalSpendByLocationKeys.length; ik++) {
          const budgetKeyName: any = this.totalSpendByLocationKeys[ik];
          this.totalSpendByLocationArray[ik] = [];
          for(let id = 0; id < this.totalSpendByLocationData.length; id++) {
            this.totalSpendByLocationArray[ik][id] = this.totalSpendByLocationData[id][budgetKeyName];
          }
          this.totalSpendByLocationArray[ik].splice(0, 0, budgetKeyName);
        }
        this.locationsbyspendCategoryArray = this.totalSpendByLocationArray[0];
        this.locationsbyspendCategoryArray.splice(0,1);
        this.totalSpendByLocationArray.splice(0,1);
        console.log(this.totalSpendByLocationArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          this.generateTotalSpendByLocationCurrencyChart(this.currency);
        });
        this.generateTotalSpendByLocationChart();
      });
  }
  generateTotalSpendByLocationChart() {
    console.log('TotalSpendByLocationChart generating..');
    const totalspendbylocation = c3.generate({
      bindto: '#totalspendbylocation',
      data: {
        columns: this.totalSpendByLocationArray,
        type: 'bar'
      },
      axis: {
        rotated: true,
        x: {
          type: 'category',
          categories:  this.locationsbyspendCategoryArray
        },
        y : {
          tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
  generateTotalSpendByLocationCurrencyChart(currency) {
    console.log('chart generating..');
    const totalspendbylocation = c3.generate({
      bindto: '#totalspendbylocation',
      data: {
        columns: this.totalSpendByLocationArray,
        type: 'bar'
      },
      axis: {
        rotated: true,
        x: {
          type: 'category',
          categories:  this.locationsbyspendCategoryArray
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
