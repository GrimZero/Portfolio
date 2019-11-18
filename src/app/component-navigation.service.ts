import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentNavigationService {
  private showInfo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  public infoActive(): Observable<boolean> {
    return this.showInfo.asObservable();
  }

  public toggleShowInfo() {
    this.showInfo.next(!this.showInfo.value);
  }
}
