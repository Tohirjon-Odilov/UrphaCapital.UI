import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentAuthService } from '../../../services/student_auth/student-auth.service';
import { ToastrService } from 'ngx-toastr';
import { StudentCreate } from '../../../interfaces/student-interfaces/student-create';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  student: StudentCreate = {} as StudentCreate;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentAuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.student.fullName = this.registerForm.value.fullName;
      this.student.email = this.registerForm.value.email;
      this.student.passwordHash = this.registerForm.value.password;
      this.student.address = '';
      this.student.phoneNumber = '';
      this.student.courseIds = [];
      // return
      this.studentService.registerStudent(this.student).subscribe({
        next: (data) => {
          this.toastr.success('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!', 'Tabriklaymiz!');
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toastr.error("Xatolik yuz berdi!", 'Xatolik');
          console.log(err);
        },
      })
      console.log('Form submitted', this.registerForm.value);
    } else {
      this.toastr.error("Ma'lumotlarda xatolik mavjud", 'Xatolik');
      console.log('Form is invalid');
    }
  }
}
