import { Component } from '@angular/core';
import { AnnouncementServicesService } from '../../../services/annoucement-service/annoucement-services.service';

@Component({
  selector: 'app-morquee-annoucment',
  templateUrl: './morquee-annoucment.component.html',
  styleUrl: './morquee-annoucment.component.scss'
})
export class MorqueeAnnoucmentComponent {
  isVisible = true;
  annoucement: any;

  closeAnnouncement() {
    this.isVisible = false;
  }

  constructor(
    private annoucementService: AnnouncementServicesService
  ){
    annoucementService.getTitle().subscribe(response => {
      this.annoucement = response.title;
    });
  }
}