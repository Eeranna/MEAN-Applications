import { Injectable } from '@angular/core';
import {Topic} from "./Topic";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TopicService {

    private topicApiUrl = 'http://localhost:8080/topics';

    constructor(private http: Http) {
    }

    findAll(): Observable<Topic[]>  {
        return this.http.get(this.topicApiUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    findById(id: number): Observable<Topic> {
        return this.http.get(this.topicApiUrl + '/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Error'));
    }

    updateTopic(topic: Topic): Observable<Topic> {
        return this.http.put(this.topicApiUrl, topic)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveTopic(topic: Topic): Observable<Topic> {
        return this.http.post(this.topicApiUrl, topic)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    deleteTopicById(id: string): Observable<boolean> {
        return this.http.delete(this.topicApiUrl + '/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
