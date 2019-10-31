import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Observable, of, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IProject } from 'src/app/interfaces/iproject';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  filtered: Observable<any>;

  projects: IProject[] = [
    {
      title: 'Portfolio', preview: 'https://via.placeholder.com/300', route: 'portfolio',
      text: 'Portfolio made in Angular, while learning typscript I decided to update my portfolio as a research project.'
    },
    {
      title: 'Color correction', preview: 'assets/Projects/TextureEditor.jpg',
      text: 'Project to make color adjustments in WPF using OpenCV C# (EmguCV).'
    },
    {
      title: 'Deputy Donut', preview: 'assets/Projects/DeputyDonut.jpg',
      text: 'Cop-and-robbers chasing game where you try and take out the other player in a power-up base battle!'
    },
    {
      title: '"VR" Kinect Shooter', preview: 'assets/Projects/VR-Dome.jpg',
      text: 'Game using the kinect to create a VR experience without the need for a headset.'
    },
    {
      title: '3D-Printing', preview: 'assets/Projects/VertexDelta.jpg',
      text: 'After acquiring a 3D-Printer I started doing some prints for concepts!'
    },
    {
      title: 'PBR', preview: 'assets/Projects/Gun.png',
      text: 'I try to make 3D models from time to time.'
    }
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
