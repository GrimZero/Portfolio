import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Observable, of, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  filtered: Observable<any>;

  constructor(private searchService: SearchService, private hostData: UserDataService) { }

  ngOnInit() {
    this.filtered =
      combineLatest(of(this.hostData.projects), this.searchService.observable.pipe(startWith('')))
        .pipe(
          map(([projects, searchString]: [{ title: string, preview: string, text: string }[], string]) =>
            projects.filter(x => x.title.toLowerCase().includes(searchString.toLowerCase()))
          ));

    this.filtered.subscribe();
  }
}
