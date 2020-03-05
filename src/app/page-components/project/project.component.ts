import { Component, OnInit, Input, HostListener } from '@angular/core';
import { IProject } from 'src/app/interfaces/iproject';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() project: IProject;
  @Input() size = 200;

  @HostListener('window:resize', ['$event']) onresize(ev?) {
    if(window.innerWidth <= 450)
    {
      this.project.thumbnailSize = window.innerWidth;
    }
    else {
      this.project.thumbnailSize = this.size;
    }
  }

  constructor() { }

  ngOnInit() {
    this.project.thumbnailSize = this.size;
  }

}
