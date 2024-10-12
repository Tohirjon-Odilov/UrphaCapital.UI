import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../services/lesson-services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from '../../../interfaces/lesson-interfaces/lesson';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeworkService } from '../../../services/homework-services/homework.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrl: './lesson-view.component.scss'
})
export class LessonViewComponent implements OnInit {
  lessonId?: string | null = "";
  lesson?: Lesson;
  videoUrl: any;
  homeworkForm: FormGroup;

  constructor(
    private _lessonService: LessonService,
    private _homeworkServices: HomeworkService,
    private fb: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

    this.homeworkForm = this.fb.group({
      title: [''],
      fILE: [''],
      description: [''],
      studentId: [0],
      mentorId: [0],
    });
  }

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



  uploadHomework() {
    if (this.homeworkForm.invalid) {
      // Handle form validation errors
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.homeworkForm.get('title')?.value);
    formData.append('file', this.homeworkForm.get('file')?.value);
    formData.append('description', this.homeworkForm.get('description')?.value);
    formData.append('studentId', "bu yerga studentni userni id si beriladi");
    
    if (this.lesson && this.lesson.course && this.lesson.course.mentorId) {
      formData.append('mentorId', this.lesson.course.mentorId.toString());
    } else {
      alert('Mentor ID is missing');
    }

    this._homeworkServices.createHomework(formData).subscribe({
      next: (response) => {
        alert('Homework uploaded successfully');
      },
      error: (err) => {
        alert('Error uploading homework');
        console.error(err);
      }
    });
  }
}