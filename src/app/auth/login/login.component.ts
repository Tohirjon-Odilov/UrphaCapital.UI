import { Student } from './../../../interfaces/student-interfaces/student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentAuthService } from '../../../services/student_auth/student-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studetnAuthService: StudentAuthService,
    private toastr: ToastrService,
    // private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Foydalanuvchi ma’lumotlari:', formData);
      this.studetnAuthService.loginStudent(formData).subscribe({
        next: (data) => {
          localStorage.setItem('accessToken', data.token);
          this.toastr.success('Xush kelibsiz!', 'Muvaffaqiyatli kirdingiz!' );
          console.log(data);
          this.router.navigate(['/']);
          this.loginForm.reset();
        },
        error: (err) => {
          if(err.status == 200){
            this.toastr.success('Xush kelibsiz!', 'Muvaffaqiyatli kirdingiz!' );
            localStorage.setItem('accessToken', err.error.text);
            this.router.navigate(['/']);
            this.loginForm.reset();
          } else{
            this.toastr.error('Parol yoki email xato!', 'Xatolik');
          }
          console.log(err);
        },
      });
    }
  }
}
