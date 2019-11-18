import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { NavbarButtonData } from 'src/app/interfaces/navbar-button-data';
import { ComponentNavigationService } from 'src/app/component-navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() icon: string;
  hostData: UserDataService;
  navigationService: ComponentNavigationService;

  menuItems: NavbarButtonData[] = [
    { icon: 'gamepad', highlightColor: '#FF0000', text: 'Projects' },
    {
      icon: 'address-book', highlightColor: '#FF0000', text: 'About', click: () => {
        this.navigation.toggleShowInfo();
      }
    }
  ];

  constructor(private user: UserDataService, private navigation: ComponentNavigationService) {
    this.hostData = user;
  }

  ngOnInit() {
  }

}
