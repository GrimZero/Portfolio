import { Component } from '@angular/core';
import { ComponentNavigationService } from 'src/app/services/component-navigation.service';
import { DataService } from 'src/app/services/data.service';
import { AboutData } from 'src/app/interfaces/about-data';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  enable: boolean;
  about: AboutData;

  constructor(private navigationService: ComponentNavigationService, private aboutData: DataService) {
    navigationService.infoActive().subscribe((observer) => this.enable = observer);
    aboutData.getAbout().subscribe(observer => this.about = observer);
  }
}
