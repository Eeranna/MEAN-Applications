import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-total-sow',
  templateUrl: './total-sow.component.html',
  styleUrls: ['./total-sow.component.css']
})
export class TotalSowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const totalsowchart = c3.generate({
      bindto: '#totalsowchart',
      size: {
        height: 275
      },
        data: {
          columns: [
            ['Tejas', 30, 500, 200, 600, 450, 350],
            ['Eeranna', 30, 300, 200, 300, 250, 350],
            ['Rohit', 30, 200, 100, 400, 150, 250],
            ['Sanjoy', 30, 200, 100, 400, 150, 250],
            ['Raja', 30, 200, 100, 400, 150, 250],
            ['Goverdan', 130, 100, 140, 200, 150, 50]
          ],
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
          }
        }
      });
  }
  monthlySow() {
    console.log('monthlysow' + document.getElementById('totalsowchart'));
    const totalsowchart = c3.generate({
      bindto: '#totalsowchart',
      size: {
        height: 275
      },
      data: {
        columns: [
          ['January', 30, 500, 200, 600, 450, 350],
          ['February', 30, 300, 200, 300, 250, 350],
          ['March', 30, 200, 100, 400, 150, 250],
          ['April', 30, 200, 100, 400, 150, 250],
          ['May', 30, 200, 100, 400, 150, 250],
          ['June', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
      }
    });
  }
  quarterlySow() {
    console.log('quarterlySow');
    const totalsowchart = c3.generate({
      bindto: '#totalsowchart',
      size: {
        height: 275
      },
      data: {
        columns: [
          ['January', 30, 500, 200, 600, 450, 350],
          ['April', 30, 300, 200, 300, 250, 350],
          ['July', 30, 200, 100, 400, 150, 250],
          ['October', 30, 200, 100, 400, 150, 250],
          ['December', 30, 200, 100, 400, 150, 250]
        ],
        type: 'bar'
      },
      color: {
        pattern: ['#ABC233', '#0694CF']
      }
    });
  }
}
