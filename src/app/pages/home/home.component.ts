import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { MentorAuthService } from '../../../services/mentor-services/mentor-auth.service';
import { Mentor } from '../../../interfaces/mentor-interfaces/mentor';
import { Course } from '../../../interfaces/course-interfaces/course';
import Swiper from 'swiper';
import { ResultService } from '../../../services/result-services/result.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];
  mentors?: Mentor[];

  slideConfig: any = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  constructor(
    private _courseService: CourseService,
    private _mentorService: MentorAuthService,
    private _resultService: ResultService
  ) {}

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

  getAllCourses() {
    this._courseService.getCourses(1, 10).subscribe((data) => {
      if (data === null) {
        location.reload();
      }
      this.courses = data;

      // Slayd konfiguratsiyasini ma'lumot olingandan so'ng yangilaymiz
      this.updateSlideConfig();
    });
  }

  updateSlideConfig() {
    this.slideConfig.slidesToShow = Math.min(5, this.courses.length);
    this.slideConfig.infinite = this.courses.length > 5;
    this.slideConfig.responsive[0].settings.slidesToShow = Math.min(
      3,
      this.courses.length
    );
    this.slideConfig.responsive[0].settings.infinite = this.courses.length > 3;
    this.slideConfig.responsive[1].settings.slidesToShow = Math.min(
      2,
      this.courses.length
    );
    this.slideConfig.responsive[1].settings.infinite = this.courses.length > 2;
  }

  getAllMentors() {
    this._mentorService.getMentors(1, 10).subscribe((data) => {
      this.mentors = data;
    });
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

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // this.menuVisible = false; // IDga o'tgandan so'ng menyuni yopish
    }
  }
  
}
