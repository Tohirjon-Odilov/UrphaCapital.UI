import { Component, OnInit } from '@angular/core';
// import { CourseService } from 'src/app/services/course.service';
// import { Course } from 'src/app/interfaces/course-interfaces/course';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from '../../../../services/course-services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { MentorAuthService } from '../../../../services/mentor-services/mentor-auth.service';
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
  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  selectedCourse: any = null; // Define selectedCourse type

  action: string | null = null;
  courseId: string | null = null;
  mentors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private mentorService: MentorAuthService
  ) {
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
    })
    
    // Marshrut parametrlari va query parametrlari bilan ishlash
    this.route.params.subscribe((params) => {
      this.action = params['action'];
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.courseId = queryParams['courseId'] || null;

      if (this.action === 'create-course') {
        this.toastr.info('Yangi kurs yaratmoqda', 'Kurs yaratish');
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
            console.log(err);
          },
        });
        this.toastr.info('Kurs yangilamoqda', 'Kurs yangilash');
      } else {
        this.router.navigate(['not-found']);
      }
    });
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
    // formData.append('email', this.courseForm.get('email')?.value);
    formData.append('MentorId', this.courseForm.get('mentorId')?.value);
    formData.append('Subtitle', this.courseForm.get('subtitle')?.value);
    // formData.append('password', this.courseForm.get('password')?.value);
    formData.append('Price', this.courseForm.get('price')?.value);

    if (this.selectedFile) {
      formData.append('Picture', this.selectedFile, this.selectedFile.name);
    }

    console.log(formData);

    this.courseService.createCourse(formData).subscribe(
      (response) => {
        console.log('Course created successfully:', response);
        // Handle success response (e.g., reset form or show success message)
      },
      (error) => {
        console.error('Error creating course:', error);
        // Handle error response
      }
    );
  }

  updateCourse(): void {
    const formData = new FormData();

    formData.append('id', this.selectedCourse.id); // Assume selectedCourse has an ID

    formData.append('Name', this.courseForm.get('name')?.value);
    formData.append('Description', this.courseForm.get('description')?.value);
    // formData.append('email', this.courseForm.get('email')?.value);
    formData.append('MentorId', this.courseForm.get('mentorId')?.value);
    formData.append('Subtitle', this.courseForm.get('subtitle')?.value);
    // formData.append('password', this.courseForm.get('password')?.value);
    formData.append('Price', this.courseForm.get('price')?.value);

    if (this.selectedFile) {
      formData.append('Picture', this.selectedFile, this.selectedFile.name);
    }else{
      console.log('Picturer null', this.selectedCourse.picture);
      formData.append('Picture', this.selectedCourse.picture);
    }

    console.log(formData);

    this.courseService.updateCourse(formData).subscribe(
      (response) => {
        console.log('Course updated successfully:', response);
        // Handle success response (e.g., reset form or show success message)
      },
      (error) => {
        console.error('Error updating course:', error);
        // Handle error response
      }
    );
  }
}
