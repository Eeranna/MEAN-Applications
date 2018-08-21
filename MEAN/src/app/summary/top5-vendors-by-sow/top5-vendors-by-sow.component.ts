import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Subscription} from 'rxjs/Subscription';
import {HeaderService} from '../../services/header.service';
import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-top5-vendors-by-sow',
  templateUrl: './top5-vendors-by-sow.component.html',
  styleUrls: ['./top5-vendors-by-sow.component.css']
})
export class Top5VendorsBySowComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  vendorsbysowData: Array<any>;
  vendorsbysowKeys: Array<String> = [];
  vendorsbysowArray: any [][];
  vendorsbysowcategoryArray: any [];
  constructor(private _dataService: DataService, private headerService: HeaderService) { }
  ngOnInit() {
    this._dataService.getVendorsBySow()
      .subscribe((res) => {
        this.vendorsbysowData = res;
        for(let k in this.vendorsbysowData[0]) {
          this.vendorsbysowKeys.push(k);
        }
        this.vendorsbysowArray = [];
        for(let ik = 0; ik < this.vendorsbysowKeys.length; ik++) {
          const budgetKeyName: any = this.vendorsbysowKeys[ik];
          this.vendorsbysowArray[ik] = [];
          for(let id = 0; id < this.vendorsbysowData.length; id++) {
            this.vendorsbysowArray[ik][id] = this.vendorsbysowData[id][budgetKeyName];
          }
          this.vendorsbysowArray[ik].splice(0, 0, budgetKeyName);
        }
        this.vendorsbysowcategoryArray = this.vendorsbysowArray[0];
        this.vendorsbysowcategoryArray.splice(0,1);
        this.vendorsbysowArray.splice(0,1);
        console.log(this.vendorsbysowArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          this.generateTop5VendorsBySowCurrencyChart(this.currency);
        });
        this.generateTop5VendorsBySowChart();
      });
  }
  generateTop5VendorsBySowChart() {
    console.log('chart generating..');
    const top5vendorsbysowchart = c3.generate({
      bindto: '#top5vendorsbysowchart',
      data: {
        columns: this.vendorsbysowArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.vendorsbysowcategoryArray
        },
        y : {
          tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
  generateTop5VendorsBySowCurrencyChart(currency) {
    console.log('chart generating..');
    const top5vendorsbysowchart = c3.generate({
      bindto: '#top5vendorsbysowchart',
      data: {
        columns: this.vendorsbysowArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.vendorsbysowcategoryArray
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
