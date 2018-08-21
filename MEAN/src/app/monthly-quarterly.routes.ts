import {Routes} from '@angular/router';
import {MonthlyComponent} from './summary/total-spend/monthly/monthly.component';
import {QuarterlyComponent} from './summary/total-spend/quarterly/quarterly.component';

export const monthly_quarterly_routes: Routes = [
  { path: '', redirectTo: 'quarterly', pathMatch: 'full' },
  { path: 'monthly', component: MonthlyComponent },
  { path: 'quarterly', component: QuarterlyComponent }
];

