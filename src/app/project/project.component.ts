import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() title: string;
  @Input() preview: string;
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
