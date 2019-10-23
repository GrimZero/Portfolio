import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProjectsComponent } from '../projects/projects.component';
import { AboutComponent } from '../about/about.component';
const routes = [
  { path: 'Home', component: HomepageComponent },
  { path: 'Projects', component: ProjectsComponent },
  { path: 'About', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class RoutingModule { }
