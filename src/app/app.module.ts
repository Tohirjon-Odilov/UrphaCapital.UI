import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './comoponents/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestSendComponent } from './pages/request-send/request-send.component';
import { FormsModule } from '@angular/forms';
import { CountyComponent } from './pages/county/county.component';
import { CourseInfoComponent } from './pages/course-info/course-info.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { LessonViewComponent } from './pages/lesson-view/lesson-view.component';
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
    LessonViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
