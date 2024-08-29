import { Component } from '@angular/core';
import { LessonService } from '../../../services/lesson-services/lesson.service';

@Component({
  selector: 'app-request-send',
  templateUrl: './request-send.component.html',
  styleUrl: './request-send.component.scss'
})
export class RequestSendComponent {
  fullName = ""
  address = ""
  phoneNumber = ""
  email = ""
  courseType = ""

  //create lesson ishladi.
  name: string = 'Name';
  courseId: number = 1;
  video?: Blob;

  constructor(private _service: LessonService) {
    this.createLesson();
  }

  createLesson() {
    const formData = new FormData();

    if (this.name) {
      formData.append('Name', this.name);
    }

    formData.append('CourseId', this.courseId.toString());

    if (this.video) {
      formData.append('Video', this.video);
    }

    this._service.createLesson(formData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error creating lesson:', error);
      }
    );
  }
  //create lesson ishladi.
  sendRequest() {

  }
}
