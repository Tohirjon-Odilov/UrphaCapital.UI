import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { MentorAuthService } from '../../../services/mentor-services/mentor-auth.service';
import { Mentor } from '../../../interfaces/mentor-interfaces/mentor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private _courseService: CourseService,
    private _mentorService: MentorAuthService,
  ) {
    this._courseService.getCourses(1, 10).subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  hoveredMentor: number | null = null;
  courses: any[] = [];
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
  

  // cards = [
  //   {
  //     title: '15+ ONLINE',
  //     img: '/assets/card.png',
  //     description:
  //       '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
  //     price: '399 000 so’m/oy',
  //   },
  //   {
  //     title: '15+ ONLINE',
  //     img: '/assets/card.png',
  //     description:
  //       '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajribaoyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajribaoyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajribaoyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
  //     price: '399 000 so’m/oy',
  //   },
  //   {
  //     title: '15+ ONLINE',
  //     img: '/assets/card.png',
  //     description:
  //       '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
  //     price: '399 000 so’m/oy',
  //   },
  //   {
  //     title: '15+ ONLINE',
  //     img: '/assets/card.png',
  //     description:
  //       '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
  //     price: '399 000 so’m/oy',
  //   },
  //   {
  //     title: '15+ ONLINE',
  //     img: '/assets/card.png',
  //     description:
  //       '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
  //     price: '399 000 so’m/oy',
  //   },
  //   {
  //     title: '15+ ONLINE',
  //     img: '/assets/card.png',
  //     description:
  //       '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
  //     price: '399 000 so’m/oy',
  //   },
  //   // Boshqa kartalar...
  // ];

  ngOnInit(): void {
    // this.getAllCourses();
    this.getAllMentors();
  }

  mentors?: Mentor[];

  // getAllCourses() {
  //   this._courseService.getCourses(1, 10).subscribe((data) => {
  //     console.log(data);
  //     this.courses = data;
  //   });
  // }

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
