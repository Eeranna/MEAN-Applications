import { Component, OnInit } from '@angular/core';
import * as c3 from "c3";
import {DataService} from "../../services/data.service";
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-sowcategory',
  templateUrl: './sowcategory.component.html',
  styleUrls: ['./sowcategory.component.css']
})
export class SowcategoryComponent implements OnInit {
  categoryData: Array<any>;
  categoryKeys: Array<String> = [];
  categoryArray: any [][];
  columns: any [][];
  constructor(private _dataService: DataService, private headerService: HeaderService) { }

  ngOnInit() {
    this._dataService.getCategory()
      .subscribe(
        (response) => {
          this.categoryData = response;
          console.log(this.categoryData);
          for(var k in this.categoryData[0]) {
            this.categoryKeys.push(k);
          }
          this.categoryArray = [];
          for(let i = 0; i < this.categoryKeys.length; i++) {
            const categorykeyName: any = this.categoryKeys[i];
            this.categoryArray[i] = [];
            for(let j = 0; j < this.categoryData.length; j++) {
              this.categoryArray[i][j] = this.categoryData[j][categorykeyName];
            }
            this.categoryArray[i].splice(0, 0, categorykeyName);
          }
          this.categoryArray.splice(0,1);
          console.log(this.categoryArray);
          this.generateCategoryChart();
        });
  }
  generateCategoryChart() {
    const categorychart1 = c3.generate({
      bindto: '#categorychart1',
      data: {
        columns : this.categoryArray,
        type: 'pie'
      }
    });
    const categorychart2 = c3.generate({
      bindto: '#categorychart2',
      data: {
        columns : this.categoryArray,
        type: 'pie'
      }
    });
  }
}
