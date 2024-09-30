import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../../services/admin-services/admin-auth.service';

@Component({
  selector: 'app-request-to-admin',
  templateUrl: './request-to-admin.component.html',
  styleUrl: './request-to-admin.component.scss'
})
export class RequestToAdminComponent {
  requestForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminAuthService) {
    this.requestForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^\\+998[0-9]{9}$')]] // Telefon uchun pattern
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.requestForm.invalid) {
      return;
    }

    // Ma'lumotlarni servisga jo'natish
    this.adminService.requestToAdmin(this.requestForm.value).subscribe(
      (response) => {
        alert('So\'rovingiz qabul qilindi!');
        this.requestForm.reset(); // Formani tozalash
        this.submitted = false;
      },
      (error) => {
        console.error('Xatolik yuz berdi:', error);
      }
    );
  }
}
