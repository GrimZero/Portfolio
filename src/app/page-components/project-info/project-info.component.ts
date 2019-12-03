import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IProject } from 'src/app/interfaces/iproject';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
  project: IProject;
  
  constructor(private route: ActivatedRoute, hostData: DataService) {
    hostData.getProjects().subscribe(data => {
      route.data.subscribe(result => {
        data.projects.forEach(element => {
          if (element.route === result.id) {
            this.project = element;
          }
        });
      });
    });
  }

  ngOnInit() {

  }
}
