import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { RouterEvent, Router, Event } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  observableRouter: Observable<Event>;

  constructor(private router: Router) {
    this.observableRouter = router.events.pipe(filter(event => event instanceof RouterEvent));
  }
}
