import { Component, OnInit } from '@angular/core';
import { ProgressbarData } from 'src/app/progressbarData';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  competences: ProgressbarData[] = [
    { name: 'C++', amount: 40 },
    { name: 'C#', amount: 75 },
    { name: 'Angular', amount: 50 }
  ];

  languages: ProgressbarData[] = [
    { name: 'Dutch', amount: 100 },
    { name: 'English', amount: 95 },
    { name: 'German', amount: 70 },
    { name: 'French', amount: 40 },
    { name: '日本語', amount: 30 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
