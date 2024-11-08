import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.scss'
})
export class CourseInfoComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
  }

  course: any;
  courseParamId: string = this.route.snapshot.paramMap.get('courseId')!;
  userId: any;

  ngOnInit() {
    this.userId = jwtDecode(localStorage.getItem('accessToken')!);
    this.userId = this.userId['UserId']
    console.log(this.courseParamId)
    this.courseService.getCourseById(this.courseParamId).subscribe({
      next: (data) => {
        this.course = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  buyCourse(id: any, price: any, userid: any) {
    console.log(this.userId)
    // return;
    this.courseService.buyCourse(id, price, userid).subscribe({
      next: (data) => {
        window.location.href = data;
        // this.toastr.success(data.message);
        console.log(data);
      },

      error: (err) => {
        window.location.href = err.error.text;
        console.log(err.error.text);
      },
    })
  }

}
