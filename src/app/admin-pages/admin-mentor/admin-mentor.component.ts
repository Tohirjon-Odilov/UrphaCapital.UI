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
    private toastr: ToastrService,
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

  editMentor(id: string) {
    this.router.navigate(['/dashboard/update-mentor'], {
      queryParams: { mentorId: id },
    });
  }

  deleteMentor(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
      } else {
        this.toastr.info("Mentor o'chirilmadi", "O'chirilmadi");
      }
    });
  }

  mentorCourses(id: any) {
    this.router.navigate(['/dashboard/mentor-courses'], {
      queryParams: { mentorId: id },
    });
  }
  
}
