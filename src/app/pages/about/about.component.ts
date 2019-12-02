import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  hostData: UserDataService;
  age: number;

  element: HTMLElement;

  constructor(private userdata: UserDataService, private el: ElementRef) {
    this.hostData = userdata;
    this.element = el.nativeElement as HTMLElement;
  }
}
