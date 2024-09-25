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
import { AdminMentorComponent } from './admin-pages/admin-mentor/admin-mentor.component';
import { CreateMentorComponent } from './admin-pages/admin-mentor/create-mentor/create-mentor.component';
import { AdminStudentComponent } from './admin-pages/admin-student/admin-student.component';

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
        path: '',
        title: 'Admin Course',
        component: AdminCourseMainComponent,
      },
      {
        path: 'courses',
        title: 'Admin Course',
        component: AdminCourseMainComponent,
      },
      // {
      //   path: 'mentor-courses/:mentorId',
      //   title: 'Admin Mentor',
      //   component: AdminCourseMainComponent,
      // },
      {
        path: 'lessons/:courseId',
        title: 'Admin Lesson',
        component: AdminCourseMainComponent,
      },
      {
        path: 'lessons/:courseId/:lessonId',
        title: 'Admin Lesson',
        component: AdminCourseMainComponent,
      },
      // {
      //   path: 'lessons',
      //   title: 'Admin Lesson',
      //   component: AdminCourseMainComponent,
      // }

      // "id": 2,
      // "name": "Ozodbek Olimjonov",
      // "description": "7 yillik tajribaga ega mentor",
      // "email": "salomalekum@gmail.com",
      // "phoneNumber": "+99893475684",
      // "picture": "/MentorsPictures/0d0aa6b2-6134-4c50-8088-108c45b266d9.jfif",
      // "passwordHash": "sdlOLwcaqM+dobgmM0C+FByVeX7V1ernB0yj+vPRCys=",
      // "salt": "a2eac4cf-6a47-48a7-81ec-44c8938de62a",
      // "role": "Mentor",
      // "courses": null
      
      // ============ mentor ================

      {
        path: 'mentors',
        title: 'Mentors',
        component: AdminMentorComponent,
      },
      {
        path: 'create-mentor',
        title: 'Admin Mentor',
        component: CreateMentorComponent,
      },
      {
        path: 'update-mentor',
        title: 'Admin Mentor',
        component: CreateMentorComponent,
      },
      {
        path: 'mentor-courses',
        title: 'Admin Course',
        component: AdminCourseMainComponent,
      },
      // ========= Admin Student ==========
      {
        path: 'students',
        title: 'Students',
        component: AdminStudentComponent,
      },
      
      {
        path: 'create-student',
        title: 'Students',
        component: AdminStudentComponent,
      },
      {
        path: 'create-student',
        title: 'Admin Student',
        component: CreateMentorComponent,
      },
      {
        path: 'update-student',
        title: 'Admin Student',
        component: CreateMentorComponent,
      },
      {
        path: ':action',
        title: 'Dashboard',
        component: CreateCourseComponent,
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
