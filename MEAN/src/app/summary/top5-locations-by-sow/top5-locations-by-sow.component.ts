import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import * as c3 from 'c3';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-top5-locations-by-sow',
  templateUrl: './top5-locations-by-sow.component.html',
  styleUrls: ['./top5-locations-by-sow.component.css']
})
export class Top5LocationsBySowComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  locationsbysowData: Array<any>;
  locationsbysowKeys: Array<String> = [];
  locationsbysowArray: any [][];
  locationsbysowcategoryArray: any [];
  // ndexOfKeys = ik;
  // indexOfData = id;
  constructor(private _dataService: DataService, private headerService: HeaderService) { }

  ngOnInit() {
    this._dataService.getLocationsBySow()
      .subscribe((res) => {
        this.locationsbysowData = res;
        for(let k in this.locationsbysowData[0]) {
          this.locationsbysowKeys.push(k);
        }
        this.locationsbysowArray = [];
        for(let ik = 0; ik < this.locationsbysowKeys.length; ik++) {
          const budgetKeyName: any = this.locationsbysowKeys[ik];
          this.locationsbysowArray[ik] = [];
          for(let id = 0; id < this.locationsbysowData.length; id++) {
            this.locationsbysowArray[ik][id] = this.locationsbysowData[id][budgetKeyName];
          }
          this.locationsbysowArray[ik].splice(0, 0, budgetKeyName);
        }
        this.locationsbysowcategoryArray = this.locationsbysowArray[0];
        this.locationsbysowcategoryArray.splice(0,1);
        this.locationsbysowArray.splice(0,1);
        console.log(this.locationsbysowArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          this.generateLocationsBySowCurrencyChart(this.currency);
        });
        this.generateLocationsBySowChart();
      });
  }
  generateLocationsBySowChart() {
    console.log('chart generating..');
    const top5locationsbysowchart = c3.generate({
      bindto: '#top5locationsbysowchart',
      data: {
        columns: this.locationsbysowArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.locationsbysowcategoryArray
        },
        y : {
          tick: {
            format: d3.format('$,')
          }
        }
      }
    });
  }
  generateLocationsBySowCurrencyChart(currency) {
    console.log('chart generating..');
    const top5locationsbysowchart = c3.generate({
      bindto: '#top5locationsbysowchart',
      data: {
        columns: this.locationsbysowArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.locationsbysowcategoryArray
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
