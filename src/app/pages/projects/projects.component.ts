import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects = [
    {name: 'Portfolio', preview: 'https://via.placeholder.com/300',
      text: 'Curabitur metus est, Integer tincidunt accumsan dui.Curabitur metus est, Integer tincidunt accumsan dui.'},
      {name: 'Portfolio', preview: 'https://via.placeholder.com/300', 
      text: 'Curabitur metus est, Integer tincidunt accumsan dui.Curabitur metus est, Integer tincidunt accumsan dui.'},
      {name: 'Portfolio', preview: 'https://via.placeholder.com/300',
      text: 'Curabitur metus est, Integer tincidunt accumsan dui.Curabitur metus est, Integer tincidunt accumsan dui.'},
      {name: 'Portfolio', preview: 'https://via.placeholder.com/300',
      text: 'Curabitur metus est, Integer tincidunt accumsan dui.Curabitur metus est, Integer tincidunt accumsan dui.'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
