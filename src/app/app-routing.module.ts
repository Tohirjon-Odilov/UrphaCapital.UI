import { Admin } from './../interfaces/admin-interfaces/admin';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RequestSendComponent } from './pages/request-send/request-send.component';
import { CountyComponent } from './pages/county/county.component';
import { CourseInfoComponent } from './pages/course-info/course-info.component';
import { LessonViewComponent } from './pages/lesson-view/lesson-view.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { LoginComponent } from './auth/login/login.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AuthGuard } from '../guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { WrapperComponent } from './pages/wrapper/wrapper.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { DashboardComponent } from './admin-pages/dashboard/dashboard.component';
import { CreateCourseComponent } from './admin-pages/admin-course/create-course/create-course.component';
import { AdminCourseMainComponent } from './admin-pages/admin-course/admin-course-main/admin-course-main.component';

const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  {
    path: '',
    title: 'OverView',
    component: HomeComponent,
    // canActivateChild: [AuthGuard],
    // children: [
  },
  // { path: '', title: 'OverView', component: WrapperComponent },
  {
    path: 'request',
    title: 'Send Request',
    component: RequestSendComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'county',
    title: 'County',
    component: CountyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-info/:courseId',
    title: 'Course Info',
    component: CourseInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lessons/:courseId/:lessonId',
    title: 'Lesson view',
    component: LessonViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lessons/:courseId',
    title: 'Lessons',
    component: LessonsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment/:courseId',
    title: 'Payment',
    component: PaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    title: 'Courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    children: [
      //course
      {
        path: 'courses',
        title: 'Admin Lesson',
        component: AdminCourseMainComponent,
      },
      {
        path: 'mentor-courses/:mentorId',
        title: 'Dashboard',
        component: AdminCourseMainComponent,
      },
      {
        path: ':action',
        title: 'Dashboard',
        component: CreateCourseComponent,
      },
      // lesson
      {
        path: 'lessons/:courseId',
        title: 'Lesson',
        component: AdminCourseMainComponent,
      },
      {
        path: 'lessons/:courseId/:lessonId',
        title: 'Admin Lesson',
        component: AdminCourseMainComponent,
      },
    ],
  },

  { path: '**', title: 'NotFound', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
