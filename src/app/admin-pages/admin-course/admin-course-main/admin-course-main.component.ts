import { Lesson } from './../../../../interfaces/lesson-interfaces/lesson';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course-services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorAuthService } from '../../../../services/mentor-services/mentor-auth.service';
import { query } from '@angular/animations';
import { LessonService } from '../../../../services/lesson-services/lesson.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../../../../interfaces/course-interfaces/course';
import { StudentAuthService } from '../../../../services/student_auth/student-auth.service';

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
    // private courseService: MentorAuthService,
    private lessonService: LessonService,
    private toastr: ToastrService,
    private studentService: StudentAuthService
  ) {}

  courses: Course[] = [];
  lessons: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  isCourseAdmin: boolean = true;
  action: any;
  courseId: any;
  mentorId: any = null;
  studentId: any = null;
  courseForSelect: any[] = [];

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
      this.studentId = queryParams['studentId'] || null;
    });
    console.log(this.studentId);

    if (this.mentorId) {
      this.courseService
        .getCoursesByMenthorId(this.mentorId, 1, 100)
        .subscribe({
          next: (data) => {
            localStorage.setItem('refreshCourse', 'true');
            this.courses = data;
          },
          error: (err) => {
            console.log(err);
          },
        });

      return;
    } else if (this.studentId) {
      this.studentService.getMyCourse(this.studentId).subscribe({
        next: (data) => {
          localStorage.setItem('refreshCourse', 'true');
          this.courses = data;
        },
        error: (err) => {
          console.log(err);
        },
      });

      // getAllCourses
      this.courseService.selectCourse().subscribe({
        next: (res) => {
          console.log(res);
          this.courseForSelect = res;
        },
        error: (err) => {
          console.log(err);
        },
      });

      return;
    } else {
      if (localStorage.getItem('refreshCourse') == 'true') {
        localStorage.removeItem('refreshCourse');
        this.ngOnInit();
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

  selectedCourseId: string | null = null; // Kursni tanlash uchun model

  // Tugma bosilganda kurs ID sini qayta ishlovchi funksiya
  addCourseToStudent(): void {
    if (this.selectedCourseId) {
      console.log('Tanlangan kurs ID:', this.selectedCourseId);
      console.log('Tanlangan student:', this.studentId);
      this.studentService
        .addCourseToStudent({
          id: this.studentId,
          courseIds: this.selectedCourseId,
        })
        .subscribe({
          next: (res) => {
            this.toastr.success("Kurs muvaffaqiyatli qo'shildi", "Qo'shildi");
            console.log("Kurs muvaffaqiyatli qo'shildi:", res);
            this.ngOnInit(); // Kurslar ro'yxatini yangilash
          },
          error: (err) => {
            console.error('Xato yuz berdi:', err);
          },
        });
      // Bu yerda tanlangan kurs bilan bog'liq funksiyalarni qo'shishingiz mumkin
    } else {
      console.log('Hech qanday kurs tanlanmagan.');
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

// ============= Student courses ============
