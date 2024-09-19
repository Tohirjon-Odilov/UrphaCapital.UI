import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course-services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorAuthService } from '../../../../services/mentor-services/mentor-auth.service';

@Component({
  selector: 'app-admin-course-main',
  templateUrl: './admin-course-main.component.html',
  styleUrl: './admin-course-main.component.scss'
})
export class AdminCourseMainComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private mentorService: MentorAuthService
  ) { }

  courses: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.courseService.getCourses(1, 10).subscribe({
      next: (res) => {
        this.courses = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  selectCourse(id: any) {
    // this.mentorService.selectedCourseId = id;
    this.router.navigate(['/admin/course/info', id]);
  }

  deleteCourse(id: any) {
    this.courseService.deleteCourse(id).subscribe({
      next: (res) => {
        console.log(res);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
