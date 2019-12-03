import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AboutData } from 'src/app/interfaces/about-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  about: AboutData;
  age: number;

  element: HTMLElement;

  subscription: Subscription;

  constructor(private userdata: DataService, private el: ElementRef) {
    this.element = el.nativeElement as HTMLElement;
  }

  ngOnInit() {
    this.subscription = this.userdata.getAbout().subscribe(result => {
      const dif = Math.abs(Date.now() - new Date(result.birthDate).getTime());
      this.age = Math.floor((dif / (1000 * 3600 * 24)) / 365.25);

      this.about = result;
      console.log(this.about);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
