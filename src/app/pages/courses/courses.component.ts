import { Component } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses: any[] = [];
  myCourses: any[] = [];
  cols: number = 0;
  userId: any

  constructor(
    private courseService: CourseService,
    private breakpointObserver: BreakpointObserver
  ) {

    this.userId = jwtDecode(localStorage.getItem('accessToken')!);
    this.userId = this.userId['UserId']
    
    this.courseService.getCourses(1, 50).subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);  
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.getMyCourses(this.userId);
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = 1;
          } else if (result.breakpoints[Breakpoints.Small]) {
            this.cols = 2;
          } else if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = 3;
          } else if (result.breakpoints[Breakpoints.Large]) {
            this.cols = 4;
          } else if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = 5;
          }
        }
      });
  }

  getMyCourses(userId: any){
    this.courseService.getCourseByUserId(userId).subscribe({
      next: (data) => {
        this.myCourses = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  getUserById(userId: any){
    this.courseService.getCourseByUserId(userId).subscribe({
      next: (data) => {
        this.myCourses = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}