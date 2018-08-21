import { Component, Input } from "@angular/core";

import {Track} from "./track.model";
import {TrackService} from "./track.service";

@Component({
    selector: 'app-track-edit',
    templateUrl: './track-edit.component.html',
    styleUrls: ['./track-edit.component.css']
})
export class TrackEditComponent {
    @Input() track: Track;
    color = 'yellow';

    constructor(private trackService: TrackService) {}

    onEdit() {
        this.trackService.editTrack(this.track);
    }

    onDelete() {
        this.trackService.deleteTrack(this.track)
            .subscribe(
                result => console.log(result)
            );
    }

    /*belongsToUser() {
        return localStorage.getItem('userId') == this.message.userId;
    }*/
}