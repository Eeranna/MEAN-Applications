import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {HeaderService} from '../../services/header.service';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-total-spend-by-vendor',
  templateUrl: './total-spend-by-vendor.component.html',
  styleUrls: ['./total-spend-by-vendor.component.css']
})
export class TotalSpendByVendorComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  totalSpendByVendorData: Array<any>;
  totalSpendByVendorKeys: Array<String> = [];
  totalSpendByVendorArray: any [][];
  totalSpendByVendorCategoryArray: any [];
  constructor(private _dataService: DataService, private headerService: HeaderService) { }
  ngOnInit() {
    this._dataService.getVendorsBySpend()
      .subscribe((res) => {
        this.totalSpendByVendorData = res;
        for(let k in this.totalSpendByVendorData[0]) {
          this.totalSpendByVendorKeys.push(k);
        }
        this.totalSpendByVendorArray = [];
        for(let ik = 0; ik < this.totalSpendByVendorKeys.length; ik++) {
          const budgetKeyName: any = this.totalSpendByVendorKeys[ik];
          this.totalSpendByVendorArray[ik] = [];
          for(let id = 0; id < this.totalSpendByVendorData.length; id++) {
            this.totalSpendByVendorArray[ik][id] = this.totalSpendByVendorData[id][budgetKeyName];
          }
          this.totalSpendByVendorArray[ik].splice(0, 0, budgetKeyName);
        }
        this.totalSpendByVendorCategoryArray = this.totalSpendByVendorArray[0];
        this.totalSpendByVendorCategoryArray.splice(0,1);
        this.totalSpendByVendorArray.splice(0,1);
        console.log(this.totalSpendByVendorArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          this.generateTotalSpendByVendorCurrencyChart(this.currency);
        });
        this.generateTotalSpendByVendorChart();
      });
  }
  generateTotalSpendByVendorChart() {
    console.log('chart generating..');
    const totalspendbyvendorchart = c3.generate({
      bindto: '#totalspendbyvendorchart',
      data: {
        columns: this.totalSpendByVendorArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.totalSpendByVendorCategoryArray
        },
        y : {
          tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
  generateTotalSpendByVendorCurrencyChart(currency) {
    console.log('chart generating..');
    const totalspendbyvendorchart = c3.generate({
      bindto: '#totalspendbyvendorchart',
      data: {
        columns: this.totalSpendByVendorArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.totalSpendByVendorCategoryArray
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
