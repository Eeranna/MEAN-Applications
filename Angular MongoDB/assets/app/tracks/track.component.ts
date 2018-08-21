import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Track} from "./track.model";
import {TrackService} from "./track.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-track',
    templateUrl: './track.component.html',
    styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
    tracks: Track[];
    track: Track;

    constructor(private trackService: TrackService, private router: Router) { }

    onSubmit(form: NgForm) {
        if (this.track) {
            // Edit
                const track = new Track(
                    form.value.name,
                    form.value.id
                );
                this.track.name = form.value.name,
                this.track.id = form.value.id
               this.trackService.updateTrack(this.track)
                .subscribe(
                    result => console.log(result)
                );
            this.track = null;
        } else {
            // Create
            const track = new Track(
                form.value.name,
                form.value.id
            );
            this.trackService.trackInsert(track)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        }
        form.resetForm();
    }

    ngOnInit() {
  /*      this.myForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            id: new FormControl(null, Validators.required)
        });*/

        this.trackService.getTracks()
            .subscribe(
                (tracks: Track[]) => {
                    this.tracks = tracks;
                }
            );

        this.trackService.trackIsEdit.subscribe(
            (track: Track) => this.track = track
        );
    }

    onClear(form: NgForm) {
       form.resetForm();
    }

}