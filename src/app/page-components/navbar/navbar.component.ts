import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/interfaces/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() icon: string;
  hostData: UserDataService;

  menuItems = [
    { name: 'Projects', icon: '../../assets/sprites/gamepad.png' },
    { name: 'About', icon: '../../assets/sprites/singleplayer.png' }
  ];

  constructor(private service: UserDataService) {
    this.hostData = service;
  }

  ngOnInit() {
  }

}
