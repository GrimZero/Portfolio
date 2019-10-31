import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutComponent } from './pages/about/about.component';
import { NavbarComponent } from './page-components/navbar/navbar.component';
import { NavbarButtonComponent } from './page-components/navbar-button/navbar-button.component';
import { ProjectComponent } from './page-components/project/project.component';
import { ProgressbarComponent } from './page-components/progressbar/progressbar.component';
import { ProgressbarListComponent } from './page-components/progressbar-list/progressbar-list.component';
import { HeroComponent } from './page-components/hero/hero.component';
import { ScrollviewComponent } from './page-components/scrollview/scrollview.component';
import { SearchComponent } from './page-components/search/search.component';
import { SearchService } from './services/search.service';
import { TypewriteComponent } from './page-components/typewrite/typewrite.component';
import { TooltipComponent } from './page-components/tooltip/tooltip.component';
import { SkillsComponent } from './page-components/skills/skills.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    NotFoundComponent,
    ProjectsComponent,
    AboutComponent,
    NavbarButtonComponent,
    ProjectComponent,
    ProgressbarComponent,
    ProgressbarListComponent,
    HeroComponent,
    ScrollviewComponent,
    SearchComponent,
    TypewriteComponent,
    TooltipComponent,
    SkillsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    RoutingModule,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
  }
}
