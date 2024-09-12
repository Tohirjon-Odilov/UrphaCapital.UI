import { Component } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses: any[] = [];
  myCourses: any[] = [];

  constructor(private courseService: CourseService) {  
    this.courseService.getCourses(1, 10).subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
   }

}
