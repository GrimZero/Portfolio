import { Component, OnInit } from '@angular/core';
import { ComponentNavigationService } from 'src/app/services/component-navigation.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  enable: boolean;

  constructor(private navigationService: ComponentNavigationService) {
    navigationService.infoActive().subscribe((observer) => this.enable = observer);  }

  ngOnInit() {
  }
}
