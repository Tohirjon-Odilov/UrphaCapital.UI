import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../../services/result-services/result.service';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss']
})
export class UserGalleryComponent implements OnInit {

  constructor(
    private resultService: ResultService
  ){}

  images: any = [
    // {
    //   url: 'https://picsum.photos/200/200?random=1',
    //   title: 'Natija 1',
    //   description: 'Bu birinchi natija'
    // },
    // {
    //   url: 'https://picsum.photos/200/200?random=2',
    //   title: 'Natija 2',
    //   description: 'Bu ikkinchi natija'
    // },
    // {
    //   url: 'https://picsum.photos/200/200?random=3',
    //   title: 'Natija 3',
    //   description: 'Bu uchinchi natija'
    // },
    // {
    //   url: 'https://picsum.photos/200/200?random=4',
    //   title: 'Natija 4',
    //   description: 'Bu to\'rtinchi natija'
    // },
    // {
    //   url: 'https://picsum.photos/200/200?random=5',
    //   title: 'Natija 5',
    //   description: 'Bu beshinchi natija'
    // },
  ];

  ngOnInit() {
    // Faqat oxirgi 4 ta rasmlarni olamiz
    this.resultService.getResult(4).subscribe(res => {
      this.images = res;
    });
  }
}
