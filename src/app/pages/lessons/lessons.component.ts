import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../services/lesson-services/lesson.service';
import { Lesson } from '../../../interfaces/lesson-interfaces/lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course-services/course.service';
import { Course } from '../../../interfaces/course-interfaces/course';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss',
})
export class LessonsComponent implements OnInit {
  ngOnInit(): void {
  }


  
  constructor(
    private _lessonService: LessonService,
    private _courseSerivice: CourseService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
    });
    this.getCourse();
    // this.getLessons();
    this._lessonService
      .getLessonByCourseId(this.courseId!, 1, 100)
      .subscribe({
        next: (data) => {
          if(data == null ) {
            location.reload();
          }
          this.lessons = data;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  courseId?: string | null = '';
  lessonId?: string | null = '';
  course?: Course;
  lessons?: any;

  getCourse() {
    this._courseSerivice.getCourseById(this.courseId!).subscribe({
      next: (data) => {
        this.course = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getLessons() {
    this._lessonService
      .getLessonByCourseId(this.courseId!, 1, 100)
      .subscribe({
        next: (data) => {
          this.lessons = data;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  forwardToLessonDetails(id: string) {
    this._router.navigateByUrl(`/lessons/${this.courseId}/${id}`);
  }

  trackLesson(index: any, lesson: any) {
    return lesson.id;
  }
  
}
