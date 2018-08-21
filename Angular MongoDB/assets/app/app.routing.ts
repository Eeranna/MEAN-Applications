import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import {TrackComponent} from "./tracks/track.component";
import {CompanyComponent} from "./company/company.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {TechnologiesComponent} from "./technologies/technologies.component";
import {HomeComponent} from "./home/home.component";
import {TopicsComponent} from "./topics/topics.component";
import {TopicCreateComponent} from "./topic-create/topic-create.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'topics', component: TopicsComponent },
    { path: 'create', component: TopicCreateComponent },
    { path: 'topic/edit/:id', component: TopicCreateComponent },
    { path: 'tracks', component: TrackComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'tech', component: TechnologiesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);