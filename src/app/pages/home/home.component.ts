import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course-services/course.service';
import { MentorAuthService } from '../../../services/mentor-services/mentor-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private _courseService: CourseService, private _mentorService: MentorAuthService) { }

  courses: any[] = [];
  teachers: any

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  cards = [
    {
      title: '15+ ONLINE',
      img: '/assets/card.png',
      description: '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
      price: '399 000 so’m/oy'
    },{
      title: '15+ ONLINE',
      img: '/assets/card.png',
      description: '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
      price: '399 000 so’m/oy'
    },{
      title: '15+ ONLINE',
      img: '/assets/card.png',
      description: '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
      price: '399 000 so’m/oy'
    },{
      title: '15+ ONLINE',
      img: '/assets/card.png',
      description: '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
      price: '399 000 so’m/oy'
    },{
      title: '15+ ONLINE',
      img: '/assets/card.png',
      description: '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
      price: '399 000 so’m/oy'
    },{
      title: '15+ ONLINE',
      img: '/assets/card.png',
      description: '15 oyda 15 000$ 180 ta video darslik Kunlik signal Savdo g’oyalar Daromad Tajriba',
      price: '399 000 so’m/oy'
    },
    // Boshqa kartalar...
  ];
  
  ngOnInit(): void {
    this.getAllCourses();
    this.getAllMentors();
  }

  getAllCourses() {
    this._courseService.getCourses().subscribe(
      (data) => {
        console.log(data);
        this.courses = data
      }
    )
  }

  getAllMentors(){
    this._mentorService.getMentorById
  }
}
