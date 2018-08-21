import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-headcount-by-location',
  templateUrl: './headcount-by-location.component.html',
  styleUrls: ['./headcount-by-location.component.css']
})
export class HeadcountByLocationComponent implements OnInit {
  headcountByLocationData: Array<any>;
  headcountByLocationKeys: Array<String> = [];
  headcountByLocationArray: any [][];
  headcountByLocationCategoryArray: any [];
  constructor(private _dataService: DataService) { }
  ngOnInit() {
    this._dataService.getLocationsBySpend()
      .subscribe((res) => {
        this.headcountByLocationData = res;
        for(let k in this.headcountByLocationData[0]) {
          this.headcountByLocationKeys.push(k);
        }
        this.headcountByLocationArray = [];
        for(let ik = 0; ik < this.headcountByLocationKeys.length; ik++) {
          const budgetKeyName: any = this.headcountByLocationKeys[ik];
          this.headcountByLocationArray[ik] = [];
          for(let id = 0; id < this.headcountByLocationData.length; id++) {
            this.headcountByLocationArray[ik][id] = this.headcountByLocationData[id][budgetKeyName];
          }
          this.headcountByLocationArray[ik].splice(0, 0, budgetKeyName);
        }
        this.headcountByLocationCategoryArray = this.headcountByLocationArray[0];
        this.headcountByLocationCategoryArray.splice(0,1);
        this.headcountByLocationArray.splice(0,1);
        console.log(this.headcountByLocationArray);
        this.generateHeadcountByLocationChart();
      });
  }
  generateHeadcountByLocationChart() {
    console.log('HeadcountByLocation chart generating..');
    const headcountbylocation = c3.generate({
      bindto: '#headcountbylocation',
      data: {
        columns: this.headcountByLocationArray,
        type: 'bar'
      },
      color: {
                pattern: ['#ABC233','#0694CF']
            },
      axis: {
        x: {
          type: 'category',
          categories:  this.headcountByLocationCategoryArray
        },
        y : {
        }
      }
    });
  }
}
