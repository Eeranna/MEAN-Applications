import { Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {ErrorService} from "../errors/error.service";
import {Country} from "../country.model";

@Injectable()
export class HeaderService {
    private countries: Country[] = [];
    years = ['2013','2014','2015','2016','2017','2018'];
    // countries = ['India','Srilanka','Bangladesh','Pakistan','China','Nepal','Afgnistan'];

    constructor(private http: Http, private errorService: ErrorService) { }

    getYear() {
      return this.years;
    }

  /*getCountry() {
    return this.countries;
  }*/

    getCountry() {
        return this.http.get('http://localhost:3000/country')
            .map((response: Response) => {
                const countries = response.json().obj;
                let transformedCountries: Country[] = [];
                for (let country of countries) {
                    transformedCountries.push(new Country(
                        country.name,
                        country.year)
                    );
                }
                this.countries = transformedCountries;
                return countries;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


}
