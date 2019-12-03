import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ComponentNavigationService } from 'src/app/services/component-navigation.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit, OnInit {
  enable: boolean;

  smallScreen: boolean;

  constructor(private navigationService: ComponentNavigationService) {
    navigationService.infoActive().subscribe((observer) => this.enable = observer);
  }

  ngOnInit() {
    this.sizeFix();
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.sizeFix);
  }

  sizeFix = () => {
    if (window.innerWidth > 805) {
      this.smallScreen = false;
    } else {
      this.smallScreen = true;
    }
  }
}
