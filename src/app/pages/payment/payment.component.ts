import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAuthService } from '../../../services/student_auth/student-auth.service';
import { StudentUpdate } from '../../../interfaces/student-interfaces/student-update';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent{

  user: any
  userDataSend: StudentUpdate = {} as StudentUpdate;
  
  constructor(
    private router: Router,
    private studentService: StudentAuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.user = jwtDecode(localStorage.getItem('accessToken') || '{}');
    console.log(this.user.UserId);

    this.studentService.getStudentById(this.user.UserId).subscribe({
      next: (data) => {
        this.userDataSend.id = this.user.UserId;
        this.userDataSend.fullName = data.fullName;
        this.userDataSend.address = data.address;
        this.userDataSend.phoneNumber = data.phoneNumber;
        this.userDataSend.email = data.email;
        this.userDataSend.passwordHash = data.passwordHash;
        console.log(this.userDataSend);
      },
      error: (err) => {
        this.toastr.error("Xatolik yuz berdi!", 'Xatolik');
        console.log(err);
      },
    })
  }

  pay() {
    this.userDataSend.courseIds = [+this.route.snapshot.paramMap.get('courseId')!];
    this.studentService.updateStudent(this.userDataSend).subscribe({
      next: (data) => {
        this.toastr.success('Xarid amalga oshirildi', 'Tabriklaymiz!');
        console.log(data);
      },
      error: (err) => {
        this.toastr.error("Xarid amalga oshirilmadi!", 'Xatolik');
        console.log(err);
      },
    })
  }
}
