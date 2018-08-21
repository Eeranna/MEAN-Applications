import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from '../../services/data.service';
import {HeaderService} from '../../services/header.service';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
  selector: 'app-total-spend-analysis',
  templateUrl: './total-spend-analysis.component.html',
  styleUrls: ['./total-spend-analysis.component.css']
})
export class TotalSpendAnalysisComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  totalSpendData: Array<any>;
  totalSpendKeys: Array<String> = [];
  totalSpendArray: any [][];
  totalSpendcategoryArray: any [];
  constructor(private dataService: DataService, private headerService: HeaderService) {}
  ngOnInit() {
    this.dataService.getMonthlyBudget()
      .subscribe((res) => {
        this.totalSpendData = res;
        for(let k in res[0]) {
          this.totalSpendKeys.push(k);
        }
        this.totalSpendArray = [];
        for(let ik = 0; ik < this.totalSpendKeys.length; ik++) {
          const monthlyKeyName: any = this.totalSpendKeys[ik];
          this.totalSpendArray[ik] = [];
          for(let id = 0; id < this.totalSpendData.length; id++) {
            this.totalSpendArray[ik][id] = this.totalSpendData[id][monthlyKeyName];
          }
          this.totalSpendArray[ik].splice(0, 0, monthlyKeyName);
        }
        this.totalSpendcategoryArray = this.totalSpendArray[0];
        this.totalSpendcategoryArray.splice(0,1);
        this.totalSpendArray.splice(0,1);
        console.log(this.totalSpendArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          this.generateTotalSpendCurrencyChart(this.currency);
        });
        this.generateTotalSpendChart();
      });
  }
  generateTotalSpendChart() {
    const totalspendchart = c3.generate({
      bindto: '#totalspendchart',
      data: {
        columns : this.totalSpendArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.totalSpendcategoryArray
        },
        y : {
           tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
  generateTotalSpendCurrencyChart(currency) {
     console.log('Monthly chart generating..');
    const totalspendchart = c3.generate({
      bindto: '#totalspendchart',
      data: {
        columns : this.totalSpendArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.totalSpendcategoryArray
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
