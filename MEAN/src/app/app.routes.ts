import {RouterModule, Routes} from '@angular/router';
import {SummaryComponent} from './summary/summary.component';
import {SowAnalysisComponent} from './sow-analysis/sow-analysis.component';
import {SpendAnalysisComponent} from './spend-analysis/spend-analysis.component';
import {HeadcountAnalysisComponent} from './headcount-analysis/headcount-analysis.component';
import {monthly_quarterly_routes} from './monthly-quarterly.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/summary', pathMatch: 'full' },
  // { path: 'summary', component: SummaryComponent, children: monthly_quarterly_routes},
  { path: 'summary', component: SummaryComponent },
  { path: 'sowanalysis', component: SowAnalysisComponent },
  { path: 'spendanalysis', component: SpendAnalysisComponent },
  { path: 'headcountanalysis', component: HeadcountAnalysisComponent }
];

export const routing = RouterModule.forRoot(routes);
