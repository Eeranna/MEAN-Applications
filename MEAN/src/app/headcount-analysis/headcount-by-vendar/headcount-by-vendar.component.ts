import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-headcount-by-vendar',
  templateUrl: './headcount-by-vendar.component.html',
  styleUrls: ['./headcount-by-vendar.component.css']
})
export class HeadcountByVendarComponent implements OnInit {
  headcountByVendorData: Array<any>;
  headcountByVendorKeys: Array<String> = [];
  headcountByVendorArray: any [][];
  headcountByVendorCategoryArray: any [];
  constructor(private _dataService: DataService) { }
  ngOnInit() {
    this._dataService.getVendorsBySow()
      .subscribe((res) => {
        this.headcountByVendorData = res;
        for(let k in this.headcountByVendorData[0]) {
          this.headcountByVendorKeys.push(k);
        }
        this.headcountByVendorArray = [];
        for(let ik = 0; ik < this.headcountByVendorKeys.length; ik++) {
          const budgetKeyName: any = this.headcountByVendorKeys[ik];
          this.headcountByVendorArray[ik] = [];
          for(let id = 0; id < this.headcountByVendorData.length; id++) {
            this.headcountByVendorArray[ik][id] = this.headcountByVendorData[id][budgetKeyName];
          }
          this.headcountByVendorArray[ik].splice(0, 0, budgetKeyName);
        }
        this.headcountByVendorCategoryArray = this.headcountByVendorArray[0];
        this.headcountByVendorCategoryArray.splice(0,1);
        this.headcountByVendorArray.splice(0,1);
        console.log(this.headcountByVendorArray);
        this.generateTotalHeadcountByVendorChart();
      });
  }
  generateTotalHeadcountByVendorChart() {
    console.log('TotalHeadcountByVendor chart generating..');
    const totalheadcountbyvendorchart = c3.generate({
      bindto: '#totalheadcountbyvendorchart',
      data: {
        columns: this.headcountByVendorArray,
        type: 'bar'
      },
      color: {
                pattern: ['#ABC233','#0694CF']
            },
      axis: {
        x: {
          type: 'category',
          categories:  this.headcountByVendorCategoryArray
        },
        y : {
        }
      }
    });
  }
}
