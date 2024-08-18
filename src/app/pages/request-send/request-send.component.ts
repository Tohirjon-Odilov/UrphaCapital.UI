import { Component } from '@angular/core';

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

  sendRequest(){
    throw new Error("Not implemented tet;");
  }
}
