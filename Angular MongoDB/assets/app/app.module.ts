import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import {AuthService} from "./auth/auth.service";
import {ErrorComponent} from "./errors/error.component";
import {ErrorService} from "./errors/error.service";
import {MessageModule} from "./messages/message.module";
import {AuthModule} from "./auth/auth.module";
import {AuthenticationComponent} from "./auth/authentication.component";
import {MenuComponent} from "./menu/menu.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderService} from "./services/header.service";
import {TrackComponent} from "./tracks/track.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TrackService} from "./tracks/track.service";
import {TrackEditComponent} from "./tracks/track-edit.component";
import {CompanyComponent} from "./company/company.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {TechnologiesComponent} from "./technologies/technologies.component";
import {TechService} from "./services/tech.service";
import {ServerService} from "./services/server.service";
import {HomeComponent} from "./home/home.component";
import {AppdJobsComponent} from "./home/appd-jobs/appd-jobs.component";
import {ConcurrentJobsComponent} from "./home/concurrent-jobs/concurrent-jobs.component";
import {TidalJobsComponent} from "./home/tidal-jobs/tidal-jobs.component";
import {TotalLocationBySowComponent} from "./home/total-location-by-sow/total-location-by-sow.component";
import {TotalSowComponent} from "./home/total-sow/total-sow.component";
import {TotalVendorBySowComponent} from "./home/total-vendor-by-sow/total-vendor-by-sow.component";
import {TopicService} from "./topics/TopicService";
import {TopicsComponent} from "./topics/topics.component";
import {TopicCreateComponent} from "./topic-create/topic-create.component";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent,
        MenuComponent,
        TrackComponent,
        TrackEditComponent,
        CompanyComponent,
        PageNotFoundComponent,
        TechnologiesComponent,
        HomeComponent,
        AppdJobsComponent,
        ConcurrentJobsComponent,
        TidalJobsComponent,
        TotalLocationBySowComponent,
        TotalSowComponent,
        TotalVendorBySowComponent,
        TopicsComponent,
        TopicCreateComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        MessageModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        ErrorService,
        HeaderService,
        TrackService,
        TechService,
        ServerService,
        TopicService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}