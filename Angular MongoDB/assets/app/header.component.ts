import {Component, OnInit} from "@angular/core";
import { trigger, state, style, transition, animate} from '@angular/animations';
import {HeaderService} from "./services/header.service";
import {Country} from "./country.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [
        trigger('slideInOut', [
            state('in', style({
                transform: 'translateX(0)'
            })),
            state('out', style({
                transform: 'translateX(-200px)'
            })),
            transition('in => out', animate('600ms ease-in-out')),
            transition('out => in', animate('1000ms ease-in-out'))
        ]),
    ]
})
export class HeaderComponent implements OnInit {
    menuState: string = 'out';
    yearData: Array<any>;
    // countryData: Array<any>;
    countries: Array<any>;
    toggleMenu() {
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }
    constructor(private headerService: HeaderService) {}

    ngOnInit() {
        this.yearData = this.headerService.getYear();
        // this.countryData = this.headerService.getCountry();
        this.headerService.getCountry()
            .subscribe(
                (countries: Country[]) => {
                    this.countries = countries;
                    console.log(this.countries);
                }
            );
        // this.isLoggedIn$ = this.authService.isLoggedIn;
    }

}