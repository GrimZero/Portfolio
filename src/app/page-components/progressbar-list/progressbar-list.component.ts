import { Component, OnInit, Input } from '@angular/core';
import { ProgressbarData } from 'src/app/progressbarData';

@Component({
  selector: 'app-progressbar-list',
  templateUrl: './progressbar-list.component.html',
  styleUrls: ['./progressbar-list.component.scss']
})
export class ProgressbarListComponent implements OnInit {

  @Input() data: ProgressbarData;
  @Input() header: string;

  constructor() { }

  ngOnInit() {
  }

}
