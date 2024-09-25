import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MentorAuthService } from '../../../../services/mentor-services/mentor-auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { StudentAuthService } from '../../../../services/student_auth/student-auth.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent {
  studentForm: FormGroup;
  selectedFile: File | null = null;
  studentId: string | null = null;
  selectedFileName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentAuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      passwordHash: ['', Validators.required],
      // picture: [null],
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.studentId = queryParams['studentId'] || null;
    });

    if (this.studentId) {
      this.isCreated = false;
    }
  }

  ngOnInit(): void {
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (data) => {
          this.studentForm.patchValue(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = new FormData();
      formData.append('fullName', this.studentForm.get('fullName')?.value);
      formData.append('address', this.studentForm.get('address')?.value);
      formData.append('email', this.studentForm.get('email')?.value);
      formData.append('phoneNumber', this.studentForm.get('phoneNumber')?.value);
      formData.append(
        'passwordHash',
        this.studentForm.get('passwordHash')?.value
      );

      if (this.selectedFile) {
        formData.append('picture', this.selectedFile);
      }

      this.studentService.registerStudent(formData).subscribe(
        (response) => {
          this.toastr.success('Student muvaffaqiyatli yaratildi', 'Yaratildi');
          console.log('Student created successfully:', response);
        },
        (error) => {
          this.toastr.error('Student yaratishda xato yuz berdi', 'Xato');
          console.error('Error creating mentor:', error);
        }
      );
    }
  }

  // ================== Update Student =================

  isCreated = true;

  updateMentor() {
    const updateStudentForm = new FormData();
    updateStudentForm.append('id', this.studentId?.toString() || '');
    updateStudentForm.append('fullName', this.studentForm.get('name')?.value);
    updateStudentForm.append(
      'address',
      this.studentForm.get('description')?.value
    );
    updateStudentForm.append('email', this.studentForm.get('email')?.value);
    updateStudentForm.append(
      'phoneNumber',
      this.studentForm.get('phoneNumber')?.value
    );
    updateStudentForm.append(
      'passwordHash',
      this.studentForm.get('passwordHash')?.value
    );

    if (this.selectedFile) {
      updateStudentForm.append('picture', this.selectedFile);
    }

    this.studentService.updateStudent(this.studentForm.value).subscribe({
      next: (res) => {
        this.toastr.success(
          "Student muvaffaqiyatli o'zgartirildi",
          "O'zgartirildi"
        );
        console.log("Student o'zgartirildi:", res);
      },
      error: (err) => {
        this.toastr.error("Studentni o'zgartirishda xato yuz berdi", 'Xato');
        console.error('Xato yuz berdi:', err);
      },
    });
  }
}
