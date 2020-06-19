import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AboutData } from 'src/app/interfaces/about-data';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  data: AboutData;

  constructor(private about: DataService) { }

  ngOnInit() {
    this.about.getAbout().subscribe(observer => this.data = observer);
  }

}
