import { Component } from '@angular/core';
import { ComponentNavigationService } from 'src/app/component-navigation.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  enable: boolean;
  renderWidth: number;

  constructor(private navigationService: ComponentNavigationService) {
    navigationService.infoActive().subscribe((observer) => this.enable = observer);
  }
}
