import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import * as c3 from 'c3';

@Component({
  selector: 'app-total-spend-by-category',
  templateUrl: './total-spend-by-category.component.html',
  styleUrls: ['./total-spend-by-category.component.css']
})
export class TotalSpendByCategoryComponent implements OnInit {
  totalSpendByCategoryData: Array<any>;
  totalSpendByCategoryKeys: Array<String> = [];
  totalSpendByCategoryArray: any [][];
  constructor(private _dataService: DataService) { }
  ngOnInit() {
    this._dataService.getCategory()
      .subscribe(
        (response) => {
          this.totalSpendByCategoryData = response;
          console.log(this.totalSpendByCategoryData);
          for(var k in this.totalSpendByCategoryData[0]) {
            this.totalSpendByCategoryKeys.push(k);
          }
          this.totalSpendByCategoryArray = [];
          for(let i = 0; i < this.totalSpendByCategoryKeys.length; i++) {
            const categorykeyName: any = this.totalSpendByCategoryKeys[i];
            this.totalSpendByCategoryArray[i] = [];
            for(let j = 0; j < this.totalSpendByCategoryData.length; j++) {
              this.totalSpendByCategoryArray[i][j] = this.totalSpendByCategoryData[j][categorykeyName];
            }
            this.totalSpendByCategoryArray[i].splice(0, 0, categorykeyName);
          }
          this.totalSpendByCategoryArray.splice(0,1);
          console.log(this.totalSpendByCategoryArray);
          this.generateTotalSpendByCategoryChart();
        });
  }
  generateTotalSpendByCategoryChart() {
    const totalspendbycategorychart1 = c3.generate({
      bindto: '#totalspendbycategorychart1',
      data: {
        columns : this.totalSpendByCategoryArray,
        type: 'pie'
      }
    });
    const totalspendbycategorychart2 = c3.generate({
      bindto: '#totalspendbycategorychart2',
      data: {
        columns : this.totalSpendByCategoryArray,
        type: 'pie'
      }
    });
  }
}
