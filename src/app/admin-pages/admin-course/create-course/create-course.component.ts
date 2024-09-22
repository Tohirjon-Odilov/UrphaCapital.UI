import { Component, OnInit } from '@angular/core';
// import { CourseService } from 'src/app/services/course.service';
// import { Course } from 'src/app/interfaces/course-interfaces/course';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from '../../../../services/course-services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { MentorAuthService } from '../../../../services/mentor-services/mentor-auth.service';
import { LessonService } from '../../../../services/lesson-services/lesson.service';
// import { Course } from '../../../interfaces/course-interfaces/course';
// import { CourseService } from '../../../services/course-services/course.service';
// import { ResponseModel } from '../../../interfaces/common-models/responseModel';
// import { ResponseModel } from 'src/app/interfaces/common-models/responseModel';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss',
})
export class CreateCourseComponent implements OnInit {
  courseForm: FormGroup;
  lessonForm: FormGroup;
  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  selectedCourse: any = null; // Define selectedCourse type
  selectedLesson: any = null;

  action: string | null = null;
  courseId: string | null = null;
  lessonId: string | null = null;
  mentors: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  selectCourseData: any = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private mentorService: MentorAuthService
  ) {
    this.lessonForm = this.fb.group({
      name: [''],
      description: [''],
      videoUrl: [null],
      courseId: [''],
    });

    this.courseForm = this.fb.group({
      name: [''],
      description: [''],
      // email: [''],
      mentorId: [''],
      subtitle: [''],
      // password: [''],
      picture: [null], // This will store the file reference
      price: [''],
    });
  }

  ngOnInit(): void {
    this.mentorService.getMentorSelectList().subscribe({
      next: (data) => {
        this.mentors = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // Marshrut parametrlari va query parametrlari bilan ishlash
    this.route.params.subscribe((params) => {
      this.action = params['action'];
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.courseId = queryParams['courseId'] || null;
      this.lessonId = queryParams['lessonId'] || null;

      if (this.action === 'create-course') {
        // this.toastr.info('Yangi kurs yaratmoqda', 'Kurs yaratish');
        // Yaratish uchun logika
      } else if (this.action === 'update-course' && this.courseId) {
        // Yangilash uchun logika
        this.courseService.getCourseById(this.courseId).subscribe({
          next: (data) => {
            this.selectedCourse = data;
            this.courseForm = this.fb.group({
              name: [data.name],
              description: [data.description],
              mentorId: [data.mentorId],
              subtitle: [data.subtitle],
              picture: [null],
              price: [data.price],
            });
            console.log(data);
          },
          error: (err) => {
            this.toastr.error(
              "Ma'lutmotlarni olishda xatolik yuz berdi!",
              'Xatolik'
            );
            console.log(err);
          },
        });
        this.toastr.info('Kurs yangilamoqda', 'Kurs yangilash');
      } else if (this.action === 'update-lesson' && this.lessonId) {
        // Yangilash uchun logika
        this.lessonService.getLessonById(this.lessonId).subscribe({
          next: (data) => {
            this.isLoading = false;
            this.selectedLesson = data;
            this.lessonForm = this.fb.group({
              name: [data.title],
              description: [data.homeworkDescription],
              // videoUrl: [data.video],
              courseId: [data.courseId],
            });
            console.log(data);
          },
          error: (err) => {
            this.toastr.error(
              "Ma'lutmotlarni olishda xatolik yuz berdi!",
              'Xatolik'
            );
            this.errorMessage = err.error.message;
            console.log(err);
          },
        });
      } else if (this.action === 'create-lesson') {
        console.log(this.action);
        console.log(this.courseId);
      } else {
        this.router.navigate(['not-found']);
      }
    });

    if(!this.courseId){
      this.courseService.selectCourse().subscribe({
        next: (data) => {
          this.selectCourseData = data;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      })
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  createCourse(): void {
    const formData = new FormData();

    formData.append('Name', this.courseForm.get('name')?.value);
    formData.append('Description', this.courseForm.get('description')?.value);
    formData.append('MentorId', this.courseForm.get('mentorId')?.value);
    formData.append('Subtitle', this.courseForm.get('subtitle')?.value);
    formData.append('Price', this.courseForm.get('price')?.value);

    if (this.selectedFile) {
      formData.append('Picture', this.selectedFile, this.selectedFile.name);
    }

    console.log(formData);

    this.courseService.createCourse(formData).subscribe(
      (response) => {
        this.toastr.success('Kurs muvaffaqiyatli yaratildi', 'Yaratildi');
        console.log('Course created successfully:', response);
      },
      (error) => {
        this.toastr.error('Kurs yaratishda xato yuz berdi', 'Xato');
        console.error('Error creating course:', error);
      }
    );
  }

  updateCourse(): void {
    const formData = new FormData();

    formData.append('id', this.selectedCourse.id);
    formData.append('Name', this.courseForm.get('name')?.value);
    formData.append('Description', this.courseForm.get('description')?.value);
    formData.append('MentorId', this.courseForm.get('mentorId')?.value);
    formData.append('Subtitle', this.courseForm.get('subtitle')?.value);
    formData.append('Price', this.courseForm.get('price')?.value);

    if (this.selectedFile) {
      formData.append('Picture', this.selectedFile, this.selectedFile.name);
    } else {
      console.log('Picturer null', this.selectedCourse.picture);
      formData.append('Picture', this.selectedCourse.picture);
    }

    console.log(formData);

    this.courseService.updateCourse(formData).subscribe(
      (response) => {
        this.isLoading = false;
        this.toastr.success('Kurs muvaffaqiyatli yangilandi', 'Yangilandi');
        console.log('Course updated successfully:', response);
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.toastr.error('Kurs yangilashda xato yuz berdi', 'Xato');
        console.error('Error updating course:', error);
      }
    );
  }

  // =========== Lesson ==============

  createLesson(): void {
    const formData = new FormData();

    if (this.courseId) {
      formData.append('CourseId', this.courseId.toString());
    }

    formData.append('Name', this.lessonForm.get('name')?.value);
    formData.append(
      'HomeworkDescription',
      this.lessonForm.get('description')?.value
    );
    // formData.append('CourseId', this.selectedLesson.id);

    if (this.selectedFile) {
      formData.append('Video', this.selectedFile, this.selectedFile.name);
    }

    console.log(formData);
    this.lessonService.createLesson(formData).subscribe(
      (response) => {
        this.toastr.success('Dars muvaffaqiyatli yaratildi', 'Yaratildi');
        console.log('Lesson created successfully:', response);
      },
      (error) => {
        this.toastr.error('Dars yaratishda xato yuz berdi', 'Xato');
        console.error('Error creating lesson:', error);
      }
    );
  }

  updateLesson(): void {
    const formData = new FormData();
    // formData.append('id', this.selectedLesson.id);
    formData.append('Name', this.lessonForm.get('name')?.value);
    formData.append('Description', this.lessonForm.get('description')?.value);
    formData.append('CourseId', this.selectedLesson.id);

    if (this.selectedFile) {
      formData.append('Video', this.selectedFile, this.selectedFile.name);
    } else {
      console.log('Picturer null', this.selectedLesson.picture);
      formData.append('Video', this.selectedLesson.videoUrl);
    }

    // formData.append('VideoUrl', this.lessonForm.get('videoUrl')?.value);
    console.log(formData);
    this.lessonService.updateLesson(formData).subscribe(
      (response) => {
        this.toastr.success('Dars muvaffaqiyatli yangilandi', 'Yangilandi');
        console.log('Lesson updated successfully:', response);
      },
      (error) => {
        this.toastr.error('Dars yangilashda xato yuz berdi', 'Xato');
        console.error('Error updating lesson:', error);
      }
    );
  }
}
