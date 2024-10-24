import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StudentAuthService } from '../../../services/student_auth/student-auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  img: string;
  passwordHash: string;
  id: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private studentService: StudentAuthService, private toastr: ToastrService) {
    this.studentId = jwtDecode(localStorage.getItem('accessToken')!);
    this.studentId = this.studentId['UserId'];

    studentService.getStudentById(this.studentId).subscribe({
      next: (res) => {
        console.log(res);
        this.user = res;
        // this.user.img = 'MentorsPictures/834ad32a-0375-4424-9ead-e25d47f1a894.jpg';
      },
      error: (err) => {
        this.toastr.error("Userni olish xatolik!", 'Xatolik');
        console.log(err, "Profile");
      }
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  user: UserProfile = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    img: '',
    passwordHash: '',
    id: '',
  };

  userForm = new FormGroup({
    fullName: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    img: new FormControl(''),
    passwordHash: new FormControl(''),
    id: new FormControl(''),
  });

  studentId: any;

  loadUserData() {
    this.userForm.setValue({
      fullName: this.user.fullName,
      address: this.user.address,
      phoneNumber: this.user.phoneNumber,
      email: this.user.email,
      img: '/MentorsPictures/834ad32a-0375-4424-9ead-e25d47f1a894.jpg',
      passwordHash: this.user.passwordHash,
      id: this.user.id,
    });
  }

  //================== modal ========================
  visible: boolean = false;

  openModal() {
    this.visible = true;
    this.userForm.setValue({
      fullName: this.user.fullName,
      address: this.user.address,
      phoneNumber: this.user.phoneNumber,
      email: this.user.email,
      img: '/MentorsPictures/834ad32a-0375-4424-9ead-e25d47f1a894.jpg',
      passwordHash: "",
      id: this.user.id,
    });
    console.log(this.userForm);
  }

  closeModal() {
    this.visible = false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // if(this.user.address === "null") {
      //   this.userForm.value.address = "null";
      // }

      this.studentService.updateStudent(this.userForm.value).subscribe({
        next: (res) => {
          console.log(res);
          location.reload();
          // this.user.fullName = res.fullName;
          // this.user.address = res.address;
          // this.user.phoneNumber = res.phoneNumber;
          // this.user.email = res.email;
          // this.user.img = res.img;
        },
        error: (err) => {
          this.toastr.error("Ma'lumotlarni o'zgartirishda xatolik!", 'Xatolik');
          console.log(err, "Profile");
        }
      });
      
      this.closeModal();
    }
  }
}
