import { Component, OnInit } from '@angular/core';

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserProfile = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+998 99 123 4567',
    address: 'Tashkent, Uzbekistan'
  };

  constructor() {}

  ngOnInit(): void {}

  editProfile(): void {
    // Edit profile logic can be added here.
    console.log('Profile editing...');
  }
}
