//importing modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { AboutusComponent } from './aboutus/aboutus.component';

//Routing
const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'details/:address',
    component: DetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'changepass',
    component: ChangepassComponent
  },
  {
    path: 'about',
    component: AboutusComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    DetailsComponent,
    LoginComponent,
    ChangepassComponent,
    AboutusComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
