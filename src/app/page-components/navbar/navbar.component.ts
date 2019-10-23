import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() icon: string;

  menuItems = [
    { name: 'Projects', icon: '../../assets/sprites/gamepad.png' },
    { name: 'About', icon: '../../assets/sprites/singleplayer.png'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
