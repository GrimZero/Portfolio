import { Component, AfterViewInit } from '@angular/core';
import { ComponentNavigationService } from 'src/app/services/component-navigation.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  enable: boolean;

  smallScreen: boolean;

  constructor(private navigationService: ComponentNavigationService) {
    navigationService.infoActive().subscribe((observer) => this.enable = observer);
  }

  ngAfterViewInit() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1293) {
        this.smallScreen = false;
      }
      else {
        this.smallScreen = true;
      }
    });
  }
}
