import {EventEmitter, Injectable, Output} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
@Injectable()
export class HeaderService {
  private subject = new Subject<string>();

  onSelect(currency: string) {
    console.log('onSelect = ' + currency);
    this.subject.next(currency);
  }

  getSelect(): Observable<string> {
    console.log('getSelect = ' + this.subject.asObservable());
    return this.subject.asObservable();
  }

}
