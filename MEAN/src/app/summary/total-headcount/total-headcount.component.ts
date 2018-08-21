import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-total-headcount',
  templateUrl: './total-headcount.component.html',
  styleUrls: ['./total-headcount.component.css']
})
export class TotalHeadcountComponent implements OnInit {
  headcountData: Array<any>;
  headcountKeys: Array<String> = [];
  headcountArray: any [][];
  headcountcategoryArray: any [];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getTotalHeadcount()
      .subscribe((res) => {
        this.headcountData = res;
        for(let k in res[0]) {
          this.headcountKeys.push(k);
        }
        this.headcountArray = [];
        for(let ik = 0; ik < this.headcountKeys.length; ik++) {
          const headcountKeyName: any = this.headcountKeys[ik];
          this.headcountArray[ik] = [];
          for(let id = 0; id < this.headcountData.length; id++) {
            this.headcountArray[ik][id] = this.headcountData[id][headcountKeyName];
          }
          this.headcountArray[ik].splice(0, 0, headcountKeyName);
        }
        this.headcountcategoryArray = this.headcountArray[0];
        this.headcountcategoryArray.splice(0,1);
        this.headcountArray.splice(0,1);
        console.log(this.headcountArray);
        this.generateTotalHeadcountChart();
      });
  }
  generateTotalHeadcountChart() {
    const totalheadcount = c3.generate({
      bindto: '#totalheadcount',
      data: {
        columns : this.headcountArray,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories:  this.headcountcategoryArray
        },
        y : {
        }
      }
    });
  }
}
