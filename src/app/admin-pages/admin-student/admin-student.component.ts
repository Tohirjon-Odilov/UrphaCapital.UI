import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { MentorAuthService } from '../../../services/mentor-services/mentor-auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../comoponents/confirm-dialog/confirm-dialog.component';
import { Student } from '../../../interfaces/student-interfaces/student';
import { StudentAuthService } from '../../../services/student_auth/student-auth.service';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrl: './admin-student.component.scss',
})
export class AdminStudentComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentAuthService,
    // private lessonService: LessonService,
    private toastr: ToastrService
  ) {}

  students: any[] = [];
  // lessons: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  // isCourseAdmin: boolean = true;
  // action: any;
  // courseId: any;

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    // this.action = params['courseId'];
    // this.courseId = params['courseId'];
    // });

    // this.isCourseAdmin =
    //   this.route.snapshot.routeConfig?.title !== 'Admin Lesson' ? true : false;
    // // this.courseId = this.route.snapshot.queryParamMap.get('courseId');

    // if (this.isCourseAdmin) {
    this.studentService.getStudents(1, 100).subscribe({
      next: (res) => {
        this.students = res;
        if (res.length == 0)
          this.toastr.info('Studentlar topilmadi', 'Topilmadi');
        console.log(res);
      },
      error: (err) => {
        this.toastr.error('Studentlar olishda xatolik', 'Xatolik');
        console.log(err);
      },
    });
    // }
  }

  addStudent() {
    this.router.navigate(['/dashboard/create-student']);
  }

  editStudent(id: string) {
    this.router.navigate(['/dashboard/update-student'], {
      queryParams: { studentId: id },
    });
  }

  showModal: boolean = false; // confirm componentga false jo'natib modalni ochib yopishni boshqaramiz
  deletedId: any = null;

  openModal(deletedId: any) {
    this.showModal = true;
    console.log('openModal: ', this.showModal);
    this.deletedId = deletedId;
  }

  deleteStudent(id: any) {
    console.log('deleteStudent: ', id);
    // this.showModal = true;
    // if (this.onConfirm(false)) {
    this.studentService.deleteStudent(id).subscribe({
      next: (res) => {
        console.log("Student o'chirildi:", res);
        this.toastr.success("Student muvaffaqiyatli o'chirildi", "O'chirildi");
        this.ngOnInit(); // Ro'yxatni yangilash
      },

      error: (err) => {
        console.error('Xato yuz berdi:', err);
        this.toastr.error("Studentni o'chirishda xato yuz berdi", 'Xato');
      },
    });
  }

  onConfirm(confirmed: boolean) {
    this.showModal = false;
    if (confirmed) {
      this.deleteStudent(this.deletedId);
    } else {
      this.toastr.info("Student o'chirilmadi", "O'chirilmadi");
    }
  }

  studentCourses(id: any) {
    this.router.navigate(['/dashboard/student-courses'], {
      queryParams: { studentId: id },
    });
  }
}
