import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './comoponents/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestSendComponent } from './pages/request-send/request-send.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountyComponent } from './pages/county/county.component';
import { CourseInfoComponent } from './pages/course-info/course-info.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { LessonViewComponent } from './pages/lesson-view/lesson-view.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { LoginComponent } from './auth/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MorqueeComponent } from './comoponents/morquee/morquee.component';
import { PaymentComponent } from './pages/payment/payment.component'; // Animatsiyalar uchun
import { GoBackComponent } from './comoponents/go-back/go-back.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WrapperComponent } from './pages/wrapper/wrapper.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from './admin-pages/dashboard/dashboard.component';
import { SearchComponent } from './comoponents/search/search.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateCourseComponent } from './admin-pages/admin-course/create-course/create-course.component';
import { AdminCourseMainComponent } from './admin-pages/admin-course/admin-course-main/admin-course-main.component';
import { AdminMentorComponent } from './admin-pages/admin-mentor/admin-mentor.component';
import { AdminStudentComponent } from './admin-pages/admin-student/admin-student.component';
import { AdminHomeworkComponent } from './admin-pages/admin-homework/admin-homework.component';
import { AdminPaymentComponent } from './admin-pages/admin-payment/admin-payment.component';
import { AdminHelpComponent } from './admin-pages/admin-help/admin-help.component';
import { AdminsComponent } from './admin-pages/admins/admins.component';
import { ConfirmDialogComponent } from './comoponents/confirm-dialog/confirm-dialog.component';
// import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateMentorComponent } from './admin-pages/admin-mentor/create-mentor/create-mentor.component';
import { CreateStudentComponent } from './admin-pages/admin-student/create-mentor/create-student.component';
import { AdminPaymentCreateComponent } from './admin-pages/admin-payment/admin-payment-create/admin-payment-create.component';
import { AdminHomeworkCreateComponent } from './admin-pages/admin-homework/admin-homework-create/admin-homework-create.component';
import { CreateHelpComponent } from './admin-pages/admin-help/create-help/create-help.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RequestToAdminComponent } from './pages/request-to-admin/request-to-admin.component';
import { UserGalleryComponent } from './pages/user-gallery/user-gallery.component';
import { AdminResultComponent } from './admin-pages/admin-help copy/admin-result.component';
import { CreateResultComponent } from './admin-pages/admin-help copy/create-result/create-result.component';
import { MorqueeAnnoucmentComponent } from './comoponents/morquee-annoucment/morquee-annoucment.component';
import { IdeasComponent } from './comoponents/ideas/ideas.component';


// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';


// import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RequestSendComponent,
    CountyComponent,
    CourseInfoComponent,
    LessonsComponent,
    LessonViewComponent,
    LoginComponent,
    MorqueeComponent,
    PaymentComponent,
    GoBackComponent,
    NotFoundComponent,
    WrapperComponent,
    RegisterComponent,
    ProfileComponent,
    CoursesComponent,
    DashboardComponent,
    SearchComponent,
    CreateCourseComponent,
    AdminCourseMainComponent,
    AdminMentorComponent,
    AdminStudentComponent,
    AdminHomeworkComponent,
    AdminPaymentComponent,
    AdminHelpComponent,
    AdminsComponent,
    ConfirmDialogComponent,
    CreateMentorComponent,
    CreateStudentComponent,
    AdminPaymentCreateComponent,
    AdminHomeworkCreateComponent,
    CreateHelpComponent,
    FooterComponent,
    RequestToAdminComponent,
    UserGalleryComponent,
    AdminResultComponent,
    CreateResultComponent,
    MorqueeAnnoucmentComponent,
    IdeasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
    }),
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  // entryComponents: [ConfirmDialogComponent]
})
export class AppModule {}
