import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import {HeaderService} from '../../../services/header.service';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-monthlysow',
  templateUrl: './monthlysow.component.html',
  styleUrls: ['./monthlysow.component.css']
})
export class MonthlysowComponent implements OnInit {
  currency: string;
  subscription: Subscription;
  monthlyData: Array<any>;
  monthlyKeys: Array<String> = [];
  monthlyArray: any [][];
  categoryArray: any [];
  constructor(private dataService: DataService, private headerService: HeaderService) {}
  ngOnInit() {
    console.log('MonthlysowComponent .... 3.1');
    this.dataService.getMonthlyBudget()
      .subscribe((res) => {
        this.monthlyData = res;
        for(let k in res[0]) {
          this.monthlyKeys.push(k);
        }
        this.monthlyArray = [];
        for(let ik = 0; ik < this.monthlyKeys.length; ik++) {
          const monthlyKeyName: any = this.monthlyKeys[ik];
          this.monthlyArray[ik] = [];
          for(let id = 0; id < this.monthlyData.length; id++) {
            this.monthlyArray[ik][id] = this.monthlyData[id][monthlyKeyName];
          }
          this.monthlyArray[ik].splice(0, 0, monthlyKeyName);
        }
        this.categoryArray = this.monthlyArray[0];
        this.categoryArray.splice(0,1);
        this.monthlyArray.splice(0,1);
        console.log(this.monthlyArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          this.generateChart(this.currency);
        });
        this.generateMonthlyChart();
      });
  }
  generateMonthlyChart() {
    const monthlysowchart = c3.generate({
      bindto: '#monthlysowchart',
      size: {
        height: 280
      },
      data: {
        columns : this.monthlyArray,
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
  generateChart(currency) {
    console.log('monthlysowchart chart generating..');
    const monthlysowchart = c3.generate({
      bindto: '#monthlysowchart',
      size: {
        height: 280
      },
      data: {
        columns : this.monthlyArray,
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
  }
}
