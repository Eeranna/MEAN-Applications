import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  getVendorsBySpend() {
    return this._http.get('/api/vendors')
      .map(result => this.result = result.json().data);
  }

  getLocationsBySpend() {
    return this._http.get('/api/locationsbyspend')
      .map(result => this.result = result.json().data);
  }

  getVendorsBySow() {
    return this._http.get('/api/vendors')
      .map(result => this.result = result.json().data);
  }

  getLocationsBySow() {
    return this._http.get('/api/locationsbyspend')
      .map(result => this.result = result.json().data);
  }

  getVendorsByHeadcount() {
    return this._http.get('/api/vendors')
      .map(result => this.result = result.json().data);
  }

  getAggregateData() {
    return this._http.get('/api/aggregate')
      .map(result => this.result = result.json().data);
  }

  getBalanceToSpend() {
    return this._http.get('/api/balance')
      .map(result => this.result = result.json().data);
  }

  getMonthlyBudget() {
    return this._http.get('/api/monthly')
      .map(result => this.result = result.json().data);
  }

  getQuarterlyBudget() {
    return this._http.get('/api/quarterly')
      .map(result => this.result = result.json().data);
  }

  getCountry() {
    return this._http.get('/api/country')
      .map(result => this.result = result.json().data);
  }

  // Sow Analysis
  getPV_STMT_WORK_CNTGNT_WRKR() {
    return this._http.get('/api/sowbalance')
      .map(result => this.result = result.json().data);
  }

  getLocation() {
    return this._http.get('/api/location')
      .map(result => this.result = result.json().data);
  }

  getVendor(){
    return this._http.get('/api/vendor')
      .map(result => this.result = result.json().data);
  }
  getCategory(){
    return this._http.get('/api/category')
      .map(result => this.result = result.json().data);
  }

  getDescription() {
    return this._http.get('/api/description')
      .map(result => this.result = result.json().data);
  }

  getTotalHeadcount() {
    return this._http.get('/api/headcount')
      .map(result => this.result = result.json().data);
  }
}
