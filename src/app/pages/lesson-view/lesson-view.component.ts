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


  constructor(private _lessonService: LessonService, private _router: Router, private route: ActivatedRoute, private santizier: DomSanitizer) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('lessonId');
    });
    this.getLessonById();
    this.getVideo();
  }

  lessonId?: string | number | null = 0;
  lesson?: Lesson;
  videoUrl: any;

  getLessonById() {
    this._lessonService.getLessonById(+this.lessonId!).subscribe(
      (data) => {
        this.lesson = data
        console.log(data);
      }
    )
  }

  getVideo() {
    this._lessonService.getLessonVideo(1).subscribe(
      (videoStream) => {
        const url = window.URL.createObjectURL(videoStream);
        
        //const hashedUrl = this.hash(url, 123);
  
        this.videoUrl = this.santizier.bypassSecurityTrustUrl(url);
  
        setTimeout(() => {
          const videoElement = document.querySelector('video');
          videoElement?.addEventListener('contextmenu', (e) => e.preventDefault());
        }, 1000);
      }
    )
  }
  

  hash(input: string, key: number): string {
    let chars: string[] = input.split('');
    for (let i = 0; i < chars.length; i++) {
      chars[i] = String.fromCharCode(chars[i].charCodeAt(0) ^ key);
    }
    return chars.join('');
  }

  unhash(hashed: string, key: number): string {
    return this.hash(hashed, key);
  }
}