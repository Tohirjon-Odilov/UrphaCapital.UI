import { Component } from '@angular/core';
import { AnnouncementServicesService } from '../../../services/annoucement-service/annoucement-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuVisible: boolean = false;
  token: any
  annoucement: any
  isAnnouncement: boolean = false
  constructor(
    private annoucementService: AnnouncementServicesService
  ) { 
    this.token = localStorage.getItem('accessToken')

    annoucementService.getTitle().subscribe(response => {
      if(response && response.length > 0){
      this.annoucement = response[0].title;
      this.isAnnouncement = true
      }
    });
   }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  closeMenuIfOpen(event: MouseEvent) {
    if (this.menuVisible) {
      this.menuVisible = false;
    }
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.menuVisible = false; // IDga o'tgandan so'ng menyuni yopish
    }
  }
}
