import {EventEmitter, Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Track} from "./track.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {ErrorService} from "../errors/error.service";

@Injectable()
export class TrackService {
    private tracks: Track[] = [];
    trackIsEdit = new EventEmitter<Track>();
    constructor(private http: Http, private errorService: ErrorService){}

    trackInsert(track: Track) {
        const body = JSON.stringify(track);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/track', body, {headers: headers})
            .map((response: Response) => response.json())
            /*.map((response: Response) => {
                const result = response.json();
                const track = new Track(
                    result.obj.name,
                    result.obj._id);
                this.tracks.push(track);
                return track;
            })*/
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getTracks() {
        return this.http.get('http://localhost:3000/track')
            .map((response: Response) => {
                const tracks = response.json().obj;
                let transformedTracks: Track[] = [];
                for (let track of tracks) {
                    transformedTracks.push(new Track(
                        track.name,
                        track._id)
                    );
                }
                this.tracks = transformedTracks;
                return tracks;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editTrack(track: Track) {
        this.trackIsEdit.emit(track);
    }

    updateTrack(track: Track) {
        const body = JSON.stringify(track);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/track/' + track._id, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteTrack(track: Track) {
        this.tracks.splice(this.tracks.indexOf(track), 1);
        return this.http.delete('http://localhost:3000/track/' + track._id)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}