import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-total-headcount-analysis',
  templateUrl: './total-headcount-analysis.component.html',
  styleUrls: ['./total-headcount-analysis.component.css']
})
export class TotalHeadcountAnalysisComponent implements OnInit {
  totalHeadcountData: Array<any>;
  totalHeadcountKeys: Array<String> = [];
  totalHeadcountArray: any [][];
  totalHeadcountCategoryArray: any [];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getTotalHeadcount()
      .subscribe((res) => {
        this.totalHeadcountData = res;
        for(let k in res[0]) {
          this.totalHeadcountKeys.push(k);
        }
        this.totalHeadcountArray = [];
        for(let ik = 0; ik < this.totalHeadcountKeys.length; ik++) {
          const headcountKeyName: any = this.totalHeadcountKeys[ik];
          this.totalHeadcountArray[ik] = [];
          for(let id = 0; id < this.totalHeadcountData.length; id++) {
            this.totalHeadcountArray[ik][id] = this.totalHeadcountData[id][headcountKeyName];
          }
          this.totalHeadcountArray[ik].splice(0, 0, headcountKeyName);
        }
        this.totalHeadcountCategoryArray = this.totalHeadcountArray[0];
        this.totalHeadcountCategoryArray.splice(0,1);
        this.totalHeadcountArray.splice(0,1);
        console.log(this.totalHeadcountArray);
        this.generateTotalHeadcountChart();
      });
  }
  generateTotalHeadcountChart() {
    const totalheadcount = c3.generate({
      bindto: '#totalheadcount',
      data: {
        columns : this.totalHeadcountArray,
        type: 'bar'
      },
      color: {
                pattern: ['#0694CF']
            },
      axis: {
        x: {
          type: 'category',
          categories:  this.totalHeadcountCategoryArray
        },
        y : {
        }
      }
    });
  }
}
