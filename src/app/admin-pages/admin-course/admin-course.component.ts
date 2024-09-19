import { Component, OnInit } from '@angular/core';
// import { CourseService } from 'src/app/services/course.service';
// import { Course } from 'src/app/interfaces/course-interfaces/course';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../../../interfaces/course-interfaces/course';
import { CourseService } from '../../../services/course-services/course.service';
import { ResponseModel } from '../../../interfaces/common-models/responseModel';
// import { ResponseModel } from 'src/app/interfaces/common-models/responseModel';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.scss'],
})
export class AdminCourseComponent implements OnInit {
  courseForm: FormGroup;
  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  selectedCourse: any = null; // Define selectedCourse type

  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private courseService: CourseService) {
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  createCourse(): void {
    const formData = new FormData();

    formData.append('name', this.courseForm.get('name')?.value);
    formData.append('description', this.courseForm.get('description')?.value);
    // formData.append('email', this.courseForm.get('email')?.value);
    formData.append('mentorId', this.courseForm.get('mentorId')?.value);
    formData.append('subtitle', this.courseForm.get('subtitle')?.value);
    // formData.append('password', this.courseForm.get('password')?.value);
    formData.append('price', this.courseForm.get('price')?.value);

    if (this.selectedFile) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }

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
    formData.append('name', this.courseForm.get('name')?.value);
    formData.append('description', this.courseForm.get('description')?.value);
    formData.append('email', this.courseForm.get('email')?.value);
    formData.append('mentorId', this.courseForm.get('mentorId')?.value);
    formData.append('phone', this.courseForm.get('phone')?.value);
    formData.append('password', this.courseForm.get('password')?.value);

    if (this.selectedFile) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }

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
