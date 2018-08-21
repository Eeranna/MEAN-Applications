import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-concurrent-jobs',
  templateUrl: './concurrent-jobs.component.html',
  styleUrls: ['./concurrent-jobs.component.css']
})
export class ConcurrentJobsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const totalconcurrentjobschart = c3.generate({
      bindto: '#totalconcurrentjobschart',
      size: {
        height: 275
      },
      data: {
        columns: [
          ['data', 30, 500, 200, 600, 450, 350],
          ['concurrent', 30, 300, 200, 300, 250, 350],
          ['appd', 30, 200, 100, 400, 150, 250],
          ['tidal', 30, 200, 100, 400, 150, 250]
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
}
