import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { MentorAuthService } from '../../../services/mentor-services/mentor-auth.service';
import { Mentor } from '../../../interfaces/mentor-interfaces/mentor';
import { Course } from '../../../interfaces/course-interfaces/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private _courseService: CourseService,
    private _mentorService: MentorAuthService,
  ) { }



  hoveredMentor: number | null = null;
  courses!: Course[];
  teachers: any;

  slideConfig = {
    slidesToShow: 5,  // Desktopda 5 ta slayd ko'rsatiladi
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,  // 1024px va kichik ekranlarda 3 ta slayd
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,  // 768px va kichik ekranlarda 2 ta slayd
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 450,  // 450px va kichik ekranlarda 1 ta slayd
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllMentors();
  }

  mentors?: Mentor[];

  getAllCourses() {
    this._courseService.getCourses(1, 10).subscribe((data) => {
      console.log(data);
      if(data == null ) {
        location.reload();
      }
      this.courses = data;
    });
  }

  getAllMentors() {
    this._mentorService.getMentors(1, 10).subscribe((data) => {
      this.mentors = data;
      console.log(data);
    });
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // this.menuVisible = false; // IDga o'tgandan so'ng menyuni yopish
    }
  }

  trackByMentorId(index: number, mentor: any) {
    return mentor.id;
  }
  
}
