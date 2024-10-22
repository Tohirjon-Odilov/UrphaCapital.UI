import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss']
})
export class UserGalleryComponent implements OnInit {

  images = [
    {
      url: 'https://loremflickr.com/200/200?random=1',
      title: 'Natija 1',
      description: 'Bu birinchi natija'
    },
    {
      url: 'https://loremflickr.com/200/200?random=2',
      title: 'Natija 2',
      description: 'Bu ikkinchi natija'
    },
    {
      url: 'https://loremflickr.com/200/200?random=3',
      title: 'Natija 3',
      description: 'Bu uchinchi natija'
    },
    {
      url: 'https://loremflickr.com/200/200?random=4',
      title: 'Natija 4',
      description: 'Bu to\'rtinchi natija'
    },
    {
      url: 'https://loremflickr.com/200/200?random=5',
      title: 'Natija 5',
      description: 'Bu beshinchi natija'
    },
  ];

  recentImages: any = [];

  ngOnInit() {
    // Faqat oxirgi 4 ta rasmlarni olamiz
    this.recentImages = this.images.slice(-4);
  }
}
