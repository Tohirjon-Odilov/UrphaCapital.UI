import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RequestSendComponent } from './pages/request-send/request-send.component';
import { CountyComponent } from './pages/county/county.component';
import { CourseInfoComponent } from './pages/course-info/course-info.component';

const routes: Routes = [
  { path: '', title: 'OverView', component:HomeComponent},
  { path: 'request', title: 'Send Request', component:RequestSendComponent},
  { path: 'county', title: 'County', component:CountyComponent},
  { path: "course-info", title: "Course Info", component:CourseInfoComponent},
  { path: '**', title: 'OverView', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
