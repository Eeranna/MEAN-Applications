import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {HeaderService} from "../../services/header.service";
import * as c3 from "c3";

@Component({
  selector: 'app-sowvendor',
  templateUrl: './sowvendor.component.html',
  styleUrls: ['./sowvendor.component.css']
})
export class SowvendorComponent implements OnInit {
  vendorData: Array<any>;
  vendorKeys: Array<String> = [];
  vendorArray: any [][];
 constructor(private _dataService: DataService, private headerService: HeaderService) { }
 ngOnInit() {
    this._dataService.getVendor()
      .subscribe(
        (response) => {
          this.vendorData = response;
          console.log(this.vendorData)
          for(var k in this.vendorData[0]) {
            this.vendorKeys.push(k);
          }
          this.vendorArray = [];
          for(let i = 0; i < this.vendorKeys.length; i++) {
            const vendorkeyName: any = this.vendorKeys[i];
            this.vendorArray[i] = [];
            for(let j = 0; j < this.vendorData.length; j++){
              this.vendorArray[i][j] = this.vendorData[j][vendorkeyName];
            }
            this.vendorArray[i].splice(0, 0, vendorkeyName);
          }
          console.log(this.vendorArray);
          this.generateVendorChart();
        });
  }
  generateVendorChart() {
    const vendorchart = c3.generate({
      bindto: '#vendorchart',
      data: {
        x: '_id',
        columns : this.vendorArray,
        type: 'bar'
      }
    });
  }
}
