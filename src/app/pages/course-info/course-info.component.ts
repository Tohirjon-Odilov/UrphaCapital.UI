import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { ActivatedRoute } from '@angular/router';

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
  courseParamId: number = +this.route.snapshot.paramMap.get('courseId')!;

  ngOnInit() {
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

}
