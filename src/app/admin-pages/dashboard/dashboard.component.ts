import { Component, OnInit } from '@angular/core';
declare var $: any; // Declare jQuery if TypeScript does not automatically recognize it.

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'], // Note the correct key is styleUrls
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // jQuery logic should be inside the ngOnInit lifecycle hook
    $('.sidebar-dropdown > a').click(function (this: HTMLElement) {
      $('.sidebar-submenu').slideUp(200);

      if ($(this).parent().hasClass('active')) {
        $('.sidebar-dropdown').removeClass('active');
        $(this).parent().removeClass('active');
      } else {
        $('.sidebar-dropdown').removeClass('active');
        $(this).next('.sidebar-submenu').slideDown(200);
        $(this).parent().addClass('active');
      }
    });

    $('#close-sidebar').click(function (this: HTMLElement) {
      $('.page-wrapper').removeClass('toggled');
    });

    $('#show-sidebar').click(function (this: HTMLElement) {
      $('.page-wrapper').addClass('toggled');
    });
  }
}
