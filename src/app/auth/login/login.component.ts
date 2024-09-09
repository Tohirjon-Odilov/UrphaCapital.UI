import { Student } from './../../../interfaces/student-interfaces/student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentAuthService } from '../../../services/student_auth/student-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private studetnAuthService: StudentAuthService,
    // private authService: AuthService,
    // private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Foydalanuvchi ma’lumotlari:', formData);
      this.studetnAuthService.loginStudent(formData).subscribe({
        next: (data) => {
          localStorage.setItem('userData', JSON.stringify(data));
          this.getUserCategory();
          this.router.navigate(['/user-category']);
          this.loginForm.reset();
          console.log(data);
        },
        error: (err) => {
          console.log(err.message)
        },
      });
    }
  }

  getUserCategory(): void{
    // this.userService.getUserCategory().subscribe({
    //   next(data) {
    //     console.log(data)
    //   },
    //   error(err){
    //     console.log(err)
    //   }
    // });
  }
}
