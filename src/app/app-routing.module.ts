import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RequestSendComponent } from './pages/request-send/request-send.component';
import { CountyComponent } from './pages/county/county.component';
import { CourseInfoComponent } from './pages/course-info/course-info.component';
import { LessonViewComponent } from './pages/lesson-view/lesson-view.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    title: 'OverView',
    component: HomeComponent,
    // canActivate: [],
    // canActivateChild: [],
    // children: [
  },
      {
        path: 'request',
        title: 'Send Request',
        component: RequestSendComponent,
      },
      { path: 'county', title: 'County', component: CountyComponent },
      {
        path: 'course-info/:courseId',
        title: 'Course Info',
        component: CourseInfoComponent,
      },
      {
        path: 'lessons/:courseId/:lessonId',
        title: 'Lesson view',
        component: LessonViewComponent,
      },
      {
        path: 'lessons/:courseId',
        title: 'Lessons',
        component: LessonsComponent,
      },
    // ],
  // },

  { path: 'login', title: 'Login', component: LoginComponent },
  { path: '**', title: 'NotFound', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
