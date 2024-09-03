import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../services/lesson-services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from '../../../interfaces/lesson-interfaces/lesson';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrl: './lesson-view.component.scss'
})
export class LessonViewComponent implements OnInit {


  constructor(private _lessonService: LessonService, private _router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('lessonId');
    });
    this.getLessonById();
  }

  lessonId?: string | number | null = 0;
  lesson?: Lesson;

  getLessonById() {
    this._lessonService.getLessonById(+this.lessonId!).subscribe(
      (data) => {
        this.lesson = data
        console.log(data);
      }
    )
  }
}
