import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorAuthService } from '../../../services/mentor-services/mentor-auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../comoponents/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-mentor',
  templateUrl: './admin-mentor.component.html',
  styleUrl: './admin-mentor.component.scss',
})
export class AdminMentorComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private mentorService: MentorAuthService,
    // private lessonService: LessonService,
    private toastr: ToastrService
  ) {}

  mentors: any[] = [];
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
    this.mentorService.getMentors(1, 100).subscribe({
      next: (res) => {
        this.mentors = res;
        if (res.length == 0)
          this.toastr.info('Mentorlar topilmadi', 'Topilmadi');
        console.log(res);
      },
      error: (err) => {
        this.toastr.error('Mentorlar olishda xatolik', 'Xatolik');
        console.log(err);
      },
    });
    // }
  }

  addMentor() {
    this.router.navigate(['/dashboard/create-mentor']);
  }

  editMentor(id: string) {
    this.router.navigate(['/dashboard/update-mentor'], {
      queryParams: { mentorId: id },
    });
  }

  showModal: boolean = false; // confirm componentga false jo'natib modalni ochib yopishni boshqaramiz
  deletedId: any = null;

  openModal(deletedId: any) {
    this.showModal = true;
    console.log('openModal: ', this.showModal);
    this.deletedId = deletedId;
  }

  deleteMentor(id: any) {
    console.log('deleteMentor: ', id);
    // this.showModal = true;
    // if (this.onConfirm(false)) {
    this.mentorService.deleteMentor(id).subscribe({
      next: (res) => {
        console.log("Mentor o'chirildi:", res);
        this.toastr.success("Mentor muvaffaqiyatli o'chirildi", "O'chirildi");
        this.ngOnInit(); // Ro'yxatni yangilash
      },

      error: (err) => {
        console.error('Xato yuz berdi:', err);
        this.toastr.error("Mentorni o'chirishda xato yuz berdi", 'Xato');
      },
    });
  }


  onConfirm(confirmed: boolean) {
    this.showModal = false;
    if (confirmed) {
      this.deleteMentor(this.deletedId);
    } else {
      this.toastr.info("Mentor o'chirilmadi", "O'chirilmadi");
    }
  }

  mentorCourses(id: any) {
    this.router.navigate(['/dashboard/mentor-courses'], {
      queryParams: { mentorId: id },
    });
  }

  //
}
