import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {HeaderService} from './services/header.service';
import { SummaryComponent } from './summary/summary.component';
import { TotalSpendComponent } from './summary/total-spend/total-spend.component';
import { Top5VendorsBySpendComponent } from './summary/top5-vendors-by-spend/top5-vendors-by-spend.component';
import { Top5LocationsBySpendComponent } from './summary/top5-locations-by-spend/top5-locations-by-spend.component';
import { TotalSowComponent } from './summary/total-sow/total-sow.component';
import { Top5VendorsBySowComponent } from './summary/top5-vendors-by-sow/top5-vendors-by-sow.component';
import { Top5LocationsBySowComponent } from './summary/top5-locations-by-sow/top5-locations-by-sow.component';
import { TotalHeadcountComponent } from './summary/total-headcount/total-headcount.component';
import { Top5VendorsByHeadcountComponent } from './summary/top5-vendors-by-headcount/top5-vendors-by-headcount.component';
import { Top5LocationsByHeadcountComponent } from './summary/top5-locations-by-headcount/top5-locations-by-headcount.component';
import {MonthlyComponent} from './summary/total-spend/monthly/monthly.component';
import {QuarterlyComponent} from './summary/total-spend/quarterly/quarterly.component';
import {DataService} from './services/data.service';
import { SowAnalysisComponent } from './sow-analysis/sow-analysis.component';
import { SpendAnalysisComponent } from './spend-analysis/spend-analysis.component';
import { HeadcountAnalysisComponent } from './headcount-analysis/headcount-analysis.component';
import { routing } from './app.routes';
import { TotalsowComponent } from './sow-analysis/totalsow/totalsow.component';
import { SowlocationComponent } from './sow-analysis/sowlocation/sowlocation.component';
import { SowvendorComponent } from './sow-analysis/sowvendor/sowvendor.component';
import { SowcategoryComponent } from './sow-analysis/sowcategory/sowcategory.component';
import { FiltersComponent } from './sow-analysis/filters/filters.component';
import {HeadcountByLocationComponent} from './headcount-analysis/headcount-by-location/headcount-by-location.component';
import {HeadcountByVendarComponent} from './headcount-analysis/headcount-by-vendar/headcount-by-vendar.component';
import {TotalHeadcountAnalysisComponent} from './headcount-analysis/total-headcount-analysis/total-headcount-analysis.component';
import { TotalSpendAnalysisComponent } from './spend-analysis/total-spend-analysis/total-spend-analysis.component';
import { TotalSpendByVendorComponent } from './spend-analysis/total-spend-by-vendor/total-spend-by-vendor.component';
import { TotalSpendByCategoryComponent } from './spend-analysis/total-spend-by-category/total-spend-by-category.component';
import { TotalSpendByLocationComponent } from './spend-analysis/total-spend-by-location/total-spend-by-location.component';
import { TotalSpendBySowtableComponent } from './spend-analysis/total-spend-by-sowtable/total-spend-by-sowtable.component';
import {MonthlysowComponent} from './summary/total-sow/monthlysow/monthlysow.component';
import {QuarterlysowComponent} from './summary/total-sow/quarterlysow/quarterlysow.component';
import {DataTableDemo1} from './demo1/data-table-demo1';
import {DataTableModule} from 'angular-4-data-table-bootstrap-4';

@NgModule({
  declarations: [
    AppComponent,
    MonthlyComponent,
    QuarterlyComponent,
    HeaderComponent,
    SummaryComponent,
    TotalSpendComponent,
    Top5VendorsBySpendComponent,
    Top5LocationsBySpendComponent,
    TotalSowComponent,
    Top5VendorsBySowComponent,
    Top5LocationsBySowComponent,
    TotalHeadcountComponent,
    Top5VendorsByHeadcountComponent,
    Top5LocationsByHeadcountComponent,
    SowAnalysisComponent,
    SpendAnalysisComponent,
    HeadcountAnalysisComponent,
    FiltersComponent,
    TotalsowComponent,
    SowlocationComponent,
    SowvendorComponent,
    SowcategoryComponent,
    HeadcountByLocationComponent,
    HeadcountByVendarComponent,
    TotalHeadcountAnalysisComponent,
    TotalSpendAnalysisComponent,
    TotalSpendByVendorComponent,
    TotalSpendByCategoryComponent,
    TotalSpendByLocationComponent,
    TotalSpendBySowtableComponent,
    MonthlysowComponent,
    QuarterlysowComponent,
    DataTableDemo1
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    routing
  ],
  providers: [DataService, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
