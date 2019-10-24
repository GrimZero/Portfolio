import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  observer: Observer<string>;
  searchString: string;

  observable = new Observable<string>((observer: Observer<string>) => {
    this.observer = observer;
  });
}
