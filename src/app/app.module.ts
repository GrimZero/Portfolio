import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { RouterModule, Router } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProjectsComponent } from './pages/projects-controller/projects.component';
import { ProjectComponent } from './page-components/project/project.component';
import { ProgressbarComponent } from './page-components/progressbar/progressbar.component';
import { SearchComponent } from './page-components/search/search.component';
import { SearchService } from './services/search.service';
import { TypewriteComponent } from './page-components/typewrite/typewrite.component';
import { TooltipComponent } from './page-components/tooltip/tooltip.component';
import { SkillsComponent } from './page-components/skills/skills.component';
import { ThreejsComponent } from './page-components/threejs/threejs.component';
import { ComponentNavigationService } from './services/component-navigation.service';
import { HttpClientModule } from '@angular/common/http';
import { ThreejsWrapperComponent } from './page-components/threejs-wrapper/threejs-wrapper.component';
import { DataService } from './services/data.service';
import { ProjectBaseComponent } from './pages/projects/project-base.component';
import { NavbarComponent } from './page-components/navbar/navbar.component';
import { AboutComponent } from './page-components/about/about.component';
import { HeroComponent } from './page-components/hero/hero.component';
import { FooterComponent } from './page-components/footer/footer.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotFoundComponent,
    ProjectsComponent,
    ProjectComponent,
    ProgressbarComponent,
    SearchComponent,
    TypewriteComponent,
    TooltipComponent,
    SkillsComponent,
    ThreejsComponent,
    ThreejsWrapperComponent,
    ProjectBaseComponent,
    NavbarComponent,
    AboutComponent,
    HeroComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RoutingModule,
    RouterModule,
    HttpClientModule,
    RoundProgressModule
  ],
  providers: [SearchService, ComponentNavigationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
}
