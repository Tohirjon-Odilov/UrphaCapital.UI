import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private _courseService: CourseService) { }
  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this._courseService.getCourses().subscribe(
      (data) => {
        console.log(data);
      }
    )
  }
}
