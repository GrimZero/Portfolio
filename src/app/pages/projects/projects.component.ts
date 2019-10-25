import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Observable, of, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  filtered: Observable<any>;

  projects = [
    {
      title: 'Portfolio', preview: 'https://via.placeholder.com/300',
      text: 'Portfolio made in Angular, while learning typscript I decided to update my portfolio as a research project.'
    },
    {
      title: 'Color correction', preview: 'https://via.placeholder.com/300',
      text: 'Project to make color adjustments in WPF using OpenCV C# (EmguCV).'
    },
    {
      title: 'Deputy Donut', preview: 'https://via.placeholder.com/300',
      text: 'Cop-and-robbers chasing game where you try and take out the other player in a power-up base battle!'
    },
    {
      title: '"VR" Kinect Shooter', preview: 'https://via.placeholder.com/300',
      text: 'Game using the kinect to create a VR experience without the need for a headset.'
    },
  ];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.filtered =
      combineLatest(of(this.projects), this.searchService.observable.pipe(startWith('')))
        .pipe(
          map(([projects, searchString]: [{ title: string, preview: string, text: string }[], string]) =>
            projects.filter(x => x.title.toLowerCase().includes(searchString.toLowerCase()))
          ));

    this.filtered.subscribe();
  }
}
