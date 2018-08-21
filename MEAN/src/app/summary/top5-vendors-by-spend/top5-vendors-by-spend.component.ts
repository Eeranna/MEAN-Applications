import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {HeaderService} from '../../services/header.service';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-top5-vendors-by-spend',
  templateUrl: './top5-vendors-by-spend.component.html',
  styleUrls: ['./top5-vendors-by-spend.component.css']
})
export class Top5VendorsBySpendComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  budgetData: Array<any>;
  budgetKeys: Array<String> = [];
  budgetArray: any [][];
  categoryArray: any [];
  // ndexOfKeys = ik;
  // indexOfData = id;
  constructor(private _dataService: DataService, private headerService: HeaderService) { }

  ngOnInit() {
    this._dataService.getVendorsBySpend()
      .subscribe((res) => {
        this.budgetData = res;
        for(let k in this.budgetData[0]) {
          this.budgetKeys.push(k);
        }
        this.budgetArray = [];
        for(let ik = 0; ik < this.budgetKeys.length; ik++) {
          const budgetKeyName: any = this.budgetKeys[ik];
          this.budgetArray[ik] = [];
          for(let id = 0; id < this.budgetData.length; id++) {
            this.budgetArray[ik][id] = this.budgetData[id][budgetKeyName];
          }
          this.budgetArray[ik].splice(0, 0, budgetKeyName);
        }
        this.categoryArray = this.budgetArray[0];
        this.categoryArray.splice(0,1);
        this.budgetArray.splice(0,1);
        console.log(this.budgetArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          // this.generateTop5VendorsSpendCurrencyChart(this.currency);
        });
        this.generateTop5VendorsSpendChart();
      });
    const chart2 = c3.generate({
      bindto: '#chart2',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 130, 100, 140, 200, 150, 50],
          ['data3', 130, 100, 140, 200, 150, 50],
          ['data4', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
      }
    });
  }
  generateTop5VendorsSpendChart() {
    console.log('chart generating..');
    const top5vendorschart = c3.generate({
      bindto: '#top5vendorschart',
      data: {
        columns: this.budgetArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.categoryArray
        },
        y : {
          tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
  /*generateTop5VendorsSpendCurrencyChart(currency) {
    console.log('chart generating..');
    const top5vendorschart = c3.generate({
      bindto: '#top5vendorschart',
      data: {
        columns: this.budgetArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.categoryArray
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
  }*/
}
