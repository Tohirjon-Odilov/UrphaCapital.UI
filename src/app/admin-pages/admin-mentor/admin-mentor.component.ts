import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorAuthService } from '../../../services/mentor-services/mentor-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-mentor',
  templateUrl: './admin-mentor.component.html',
  styleUrl: './admin-mentor.component.scss',
})
export class AdminMentorComponent implements OnInit {
  constructor(
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

  editMentor(id: string) {
    this.router.navigate(['/dashboard/update-mentor'], {
      queryParams: { mentorId: id },
    });
  }

  deleteMentor(id: any) {
    if (confirm("Mentor o'chirilsinmi?"))
      this.mentorService.deleteMentor(id).subscribe({
        next: (res) => {
          console.log("Mentor o'chirildi:", res);
          this.toastr.success("Mentor muvaffaqiyatli o'chirildi", "O'chirildi");
          this.ngOnInit(); // Mentor ro'yxatini yangilash
        },
        error: (err) => {
          console.error('Xato yuz berdi:', err);
          this.toastr.error("Mentorni o'chirishda xato yuz berdi", 'Xato');
        },
      });
    else{
      this.toastr.info("Mentor o'chirilmadi", "O'chirilmadi");
    }
  }

  mentorCourses(id: any) {
    this.router.navigate(['/dashboard/mentor-courses'], {
      queryParams: { mentorId: id },
    });
  }
  
}
