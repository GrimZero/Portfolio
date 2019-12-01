import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { IProject } from 'src/app/interfaces/iproject';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
  project: IProject;
  constructor(private route: ActivatedRoute, hostData: UserDataService) { 
    route.data.subscribe(data => {
      hostData.projects.forEach(element => {
        if(element.route === data.id) {
          this.project = element;
          console.log(this.project);
        }        
      });
    });
  }

  ngOnInit() {
    
  }

}