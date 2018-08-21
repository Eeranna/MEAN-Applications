import { Injectable } from '@angular/core';
import {Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import {ErrorService} from "../errors/error.service";
import {Technology} from "../technologies/technology.model";

@Injectable()
export class TechService {
  // technlogies = ['Angular5', 'SpringBoot', 'MongoDB', 'Rest Services', 'CytoScape' , 'Neo4J'];
    private technologies: Technology[] = [];
    constructor(private http: Http, private errorService: ErrorService) { }
  /*getTechnologies() {
    return this.technlogies;
  }*/

    getTechnologies() {
        return this.http.get('http://localhost:3000/technology')
            .map((response: Response) => {
                const technologies = response.json().obj;
                let transformedTechnologies: Technology[] = [];
                for (let technology of technologies) {
                    transformedTechnologies.push(new Technology(
                        technology.name,
                        technology.version)
                    );
                }
                this.technologies = transformedTechnologies;
                return technologies;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}
