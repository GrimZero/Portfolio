import { Component, OnInit, ElementRef, Output } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor(private el: ElementRef) { }

  height: number;

  ngOnInit() {
    this.height = this.el.nativeElement.offsetHeight;
  }

}
