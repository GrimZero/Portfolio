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

  svgSize = 80;

  constructor(private about: DataService) { }

  ngOnInit() {
    this.about.getAbout().subscribe(observer => this.data = observer);
  }

  onNavigate(path: string) {
    window.open(path, '_blank');
  }

}
