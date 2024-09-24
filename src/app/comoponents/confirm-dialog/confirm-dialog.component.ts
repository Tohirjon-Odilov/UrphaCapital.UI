import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  styleUrls: ['./confirm-dialog.component.scss'],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  @Output() confirmed = new EventEmitter<boolean>();
  @Input() showModal: boolean = true; // Modalka ochiq holatda bo'lishi uchun

  confirm() {
    this.confirmed.emit(true);
    this.showModal = false; // Tasdiqdan keyin modalni yopish
  }

  cancel() {
    this.confirmed.emit(false);
    this.showModal = false; // Bekor qilish tugmasini bosganda modalni yopish
  }
}
