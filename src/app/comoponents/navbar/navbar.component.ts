import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuVisible: boolean = false;

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
