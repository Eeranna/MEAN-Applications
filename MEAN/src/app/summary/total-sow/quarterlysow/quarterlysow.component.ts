import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import {Subscription} from 'rxjs/Subscription';
import * as d3 from 'd3';
import {HeaderService} from '../../../services/header.service';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-quarterlysow',
  templateUrl: './quarterlysow.component.html',
  styleUrls: ['./quarterlysow.component.css']
})
export class QuarterlysowComponent implements OnInit {currency: string;
  subscription: Subscription;
  quarterlyData: Array<any>;
  quarterlyKeys: Array<String> = [];
  quarterlyArray: any [][];
  categoryArray: any [];
  constructor(private dataService: DataService, private headerService: HeaderService) {}
  ngOnInit() {
    console.log('QuarterlysowComponent .... 3.2');
    this.dataService.getQuarterlyBudget()
      .subscribe((res) => {
        this.quarterlyData = res;
        for(let k in this.quarterlyData[0]) {
          this.quarterlyKeys.push(k);
        }
        this.quarterlyArray = [];
        for(let ik = 0; ik < this.quarterlyKeys.length; ik++) {
          const quarterlyKeyName: any = this.quarterlyKeys[ik];
          this.quarterlyArray[ik] = [];
          for(let id = 0; id < this.quarterlyData.length; id++) {
            this.quarterlyArray[ik][id] = this.quarterlyData[id][quarterlyKeyName];
          }
          this.quarterlyArray[ik].splice(0, 0, quarterlyKeyName);
        }
        this.categoryArray = this.quarterlyArray[0];
        this.categoryArray.splice(0,1);
        this.quarterlyArray.splice(0,1);
        console.log(this.quarterlyArray);
        this.subscription = this.headerService.getSelect().subscribe(currency => {
          this.currency = currency;
          console.log(this.currency);
          this.generateChart(this.currency);
        });
        this.generateQuarterlyChart();
      });
  }
  generateQuarterlyChart() {
    console.log('quaterlysowchart chart generating..');
    const quaterlysowchart = c3.generate({
      bindto: '#quaterlysowchart',
      size: {
        height: 280
      },
      data: {
        columns : this.quarterlyArray,
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
    console.log('quaterlysowchart chart generating..');
    const quaterlysowchart = c3.generate({
      bindto: '#quaterlysowchart',
      size: {
        height: 280
      },
      data: {
        columns : this.quarterlyArray,
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
