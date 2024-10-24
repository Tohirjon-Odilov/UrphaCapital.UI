import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultService } from '../../../../services/result-services/result.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.scss'],
})
export class CreateResultComponent {
  createForm: FormGroup;
  isSubmitted = false;
  uploadProgress = 0;
  
  constructor(private fb: FormBuilder, private resultService: ResultService, private toaster: ToastrService) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      picture: [null, Validators.required], // Fayl tanlash uchun input
    });
  }

  // Formni yuborish funksiyasi
  onSubmit() {
    this.isSubmitted = true;

    if (this.createForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.createForm.get('title')?.value);
    formData.append('description', this.createForm.get('description')?.value);
    formData.append('picture', this.createForm.get('picture')?.value); // Faylni qo'shamiz

    this.resultService.createResult(formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.toaster.success('Ma\'lumot muvaffaqiyatli yaratildi', 'Yaratildi');
        // Ma'lumot muvaffaqiyatli yaratildi, kerak bo'lsa qo'shimcha amallar
      },
      error: (err) => {
        this.toaster.error('Xatolik yuz berdi', 'Xatolik');
        console.error('Error:', err);
        // Xatolik yuz berganda
      },
    });
  }

  // Faylni tanlash funksiyasi
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.createForm.patchValue({ picture: file });
    this.createForm.get('picture')?.updateValueAndValidity();
  }
}
