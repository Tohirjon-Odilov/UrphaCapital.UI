import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { MentorAuthService } from '../../../services/mentor-services/mentor-auth.service';
import { Mentor } from '../../../interfaces/mentor-interfaces/mentor';
import { Course } from '../../../interfaces/course-interfaces/course';
import Swiper from 'swiper';

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

    // Swiper config
    new Swiper('.swiper', {
      slidesPerView: 4, // Bir vaqtning o'zida ko'rsatiladigan slaydlar soni
      autoplay: {
        delay: 2000, // Time between slides (in milliseconds)
        disableOnInteraction: false, // Ensures autoplay continues after user interaction
      },
      spaceBetween: 15,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        // Mobil qurilmalar uchun sozlamalar
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
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

  isFormOpen = false;

  // Forma ochilishi
  openForm(): void {
    this.isFormOpen = true;
  }

  // Formani yopish
  closeForm(): void {
    this.isFormOpen = false;
  }
  
}

