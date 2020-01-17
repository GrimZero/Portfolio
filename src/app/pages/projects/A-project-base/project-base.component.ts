import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IProject } from 'src/app/interfaces/iproject';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-base',
  templateUrl: './project-base.component.html',
  styleUrls: ['./project-base.component.scss']
})
export class ProjectBaseComponent implements OnInit, OnDestroy {
  project: IProject = { alternatePreviews: ['']};
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private dataReader: DataService) { }

  ngOnInit() {
    const getProjects$ = this.dataReader.getProjects();
    const getRoute$ = getProjects$.pipe(
      switchMap(user => this.route.data)
    );

    this.subscription = combineLatest(getProjects$, getRoute$).pipe(
      map(([data, result]) => {
        data.projects.forEach(element => {
          if (element.route === result.id) {
            this.project = element;
          }
        });
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
