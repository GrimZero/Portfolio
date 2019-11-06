import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { NavbarButtonData } from 'src/app/interfaces/navbar-button-data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() icon: string;
  hostData: UserDataService;

  menuItems: NavbarButtonData[] = [
    { icon: 'gamepad', route: 'Projects', highlightColor: '#FF0000' },
    { icon: 'address-book', route: 'About', highlightColor: '#FF0000' }
  ];

  constructor(private service: UserDataService) {
    this.hostData = service;
  }

  ngOnInit() {
  }

}
