import { Lesson } from './../../../../interfaces/lesson-interfaces/lesson';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course-services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorAuthService } from '../../../../services/mentor-services/mentor-auth.service';
import { query } from '@angular/animations';
import { LessonService } from '../../../../services/lesson-services/lesson.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../../../../interfaces/course-interfaces/course';

@Component({
  selector: 'app-admin-course-main',
  templateUrl: './admin-course-main.component.html',
  styleUrl: './admin-course-main.component.scss',
})
export class AdminCourseMainComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    // private mentorService: CourseService,
    private lessonService: LessonService,
    private toastr: ToastrService
  ) {}

  courses: Course[] = [];
  lessons: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  isCourseAdmin: boolean = true;
  action: any;
  courseId: any;

  mentorId: any = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.action = params['courseId'];
      this.courseId = params['courseId'];
    });

    this.isCourseAdmin =
      this.route.snapshot.routeConfig?.title !== 'Admin Lesson' ? true : false;
    // this.courseId = this.route.snapshot.queryParamMap.get('courseId');

    this.route.queryParams.subscribe((queryParams) => {
      this.mentorId = queryParams['mentorId'] || null;
      // this.refresh = queryParams['refresh'] || null;
    });

    if(this.mentorId){
      this.courseService.getCoursesByMenthorId(this.mentorId, 1, 100).subscribe({
        next: (data) => {
          localStorage.setItem('refreshCourse', 'true')
          this.courses = data;
          // this.mentorId = data.id;
        },
        error: (err) => {
          console.log(err);
        },
      });
      
      return
    }else{
      if(localStorage.getItem('refreshCourse') == 'true'){
        localStorage.removeItem('refreshCourse')
        this.ngOnInit()
      }
    }

    if (this.isCourseAdmin) {
      this.courseService.getCourses(1, 90).subscribe({
        next: (res) => {
          this.courses = res;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.lessonService.getLessonByCourseId(this.action, 1, 100).subscribe({
        next: (res) => {
          this.lessons = res;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  addCourse() {
    this.router.navigate(['/dashboard/create-course'], {
      queryParams: { mentorId: this.mentorId },
    });
  }

  editCourse(id: string) {
    this.router.navigate(['/dashboard/update-course'], {
      queryParams: { courseId: id },
    });
  }

  deleteCourse(id: any) {
    this.courseService.deleteCourse(id).subscribe({
      next: (res) => {
        console.log("Kurs o'chirildi:", res);
        this.toastr.success("Kurs muvaffaqiyatli o'chirildi", "O'chirildi");
        this.ngOnInit(); // Kurslar ro'yxatini yangilash
      },
      error: (err) => {
        console.error('Xato yuz berdi:', err);
        this.toastr.error("Kursni o'chirishda xato yuz berdi", 'Xato');
      },
    });
  }

  //= ============= Lesson ===========

  addLesson() {
    this.router.navigate(['/dashboard/create-lesson'], {
      queryParams: { courseId: this.courseId },
    });
  }

  editLesson(id: string) {
    this.router.navigate(['/dashboard/update-lesson'], {
      queryParams: { lessonId: id },
    });
  }

  deleteLesson(id: any) {
    this.lessonService.deleteLesson(id).subscribe({
      next: (res) => {
        console.log("Dars o'chirildi:", res);
        this.toastr.success("Dars muvaffaqiyatli o'chirildi", "O'chirildi");
        this.ngOnInit(); // Kurslar ro'yxatini yangilash
      },
      error: (err) => {
        console.error('Xato yuz berdi:', err);
        this.toastr.error("Darsni o'chirishda xato yuz berdi", 'Xato');
      },
    });
  }
}

// ============= Mentor courses ============


