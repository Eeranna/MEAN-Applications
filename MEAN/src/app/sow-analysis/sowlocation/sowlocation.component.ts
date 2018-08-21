import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {HeaderService} from "../../services/header.service";
import * as c3 from "c3";

@Component({
  selector: 'app-sowlocation',
  templateUrl: './sowlocation.component.html',
  styleUrls: ['./sowlocation.component.css']
})
export class SowlocationComponent implements OnInit {
  locationData: Array<any>;
  locationKeys: Array<String> = [];
  locationArray: any [][];

  constructor(private _dataService: DataService, private headerService: HeaderService) { }

  ngOnInit() {
    this._dataService.getLocation()
      .subscribe(
        (response) => {
          this.locationData = response;
          console.log(this.locationData)
          for(var k in this.locationData[0]) {
            this.locationKeys.push(k);
          }
          this.locationArray = [];
          for(let i = 0; i < this.locationKeys.length; i++) {
            const locationkeyName: any = this.locationKeys[i];
            this.locationArray[i] = [];
            for(let j = 0; j < this.locationData.length; j++){
              this.locationArray[i][j] = this.locationData[j][locationkeyName];
            }
            this.locationArray[i].splice(0, 0, locationkeyName);
          }
          console.log(this.locationArray);
          this.generateLocationChart();
        });
  }
  generateLocationChart() {
    const locationchart = c3.generate({
      bindto: '#locationchart',
      data: {
        x: '_id',
        columns : this.locationArray,
        type: 'bar'
      },
      bar: {
        width: 30
      },
      axis: {
        rotated: true,
        x: {
          type: 'category',
          tick: {
            multiline: false
          }
        },
        y: {
        }
      }
    });
  }
}
