import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AboutData } from 'src/app/interfaces/about-data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  data: AboutData;

  constructor(private about: DataService) { }

  ngOnInit() {
    this.about.getAbout().subscribe(observer => this.data = observer);
  }

}
