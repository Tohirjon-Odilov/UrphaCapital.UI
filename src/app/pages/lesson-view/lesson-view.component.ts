import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../services/lesson-services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from '../../../interfaces/lesson-interfaces/lesson';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrl: './lesson-view.component.scss'
})
export class LessonViewComponent implements OnInit {
  lessonId?: string | null = "";
  lesson?: any;
  videoUrl: any;

  constructor(
    private _lessonService: LessonService,
    private _router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.lessonId = params.get('lessonId');
    });
    this.getLessonById();
    // this.getVideo();
  }

  getLessonById() {
    if (this.lessonId) {
      this._lessonService.getLessonById(this.lessonId).subscribe((data) => {
        this.lesson = data;
        console.log(data);
      });
    }
  }

  getVideo() {
    if (this.lessonId) {
      this._lessonService.getLessonVideo(this.lessonId).subscribe(
        (videoStream) => {
          const url = window.URL.createObjectURL(videoStream);
          this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(url);

          setTimeout(() => {
            const videoElement = document.querySelector('video');
            videoElement?.addEventListener('contextmenu', (e) => e.preventDefault());
          }, 1000);
        },
        (error) => {
          console.error('Error fetching video:', error);
        }
      );
    }
  }
}