import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MentorAuthService } from '../../../../services/mentor-services/mentor-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-mentor',
  templateUrl: './create-mentor.component.html',
  styleUrls: ['./create-mentor.component.scss'],
})
export class CreateMentorComponent {
  mentorForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorAuthService,
    private toastr: ToastrService
  ) {
    this.mentorForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      passwordHash: ['', Validators.required],
      picture: [null],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.mentorForm.valid) {
      const formData = new FormData();
      formData.append('name', this.mentorForm.get('name')?.value);
      formData.append('description', this.mentorForm.get('description')?.value);
      formData.append('email', this.mentorForm.get('email')?.value);
      formData.append('phoneNumber', this.mentorForm.get('phoneNumber')?.value);
      formData.append(
        'passwordHash',
        this.mentorForm.get('passwordHash')?.value
      );

      if (this.selectedFile) {
        formData.append('picture', this.selectedFile);
      }

      this.mentorService.createMentor(formData).subscribe(
        (response) => {
          this.toastr.success('Mentor muvaffaqiyatli yaratildi', 'Yaratildi');
          console.log('Mentor created successfully:', response);
        },
        (error) => {
          this.toastr.error('Mentor yaratishda xato yuz berdi', 'Xato');
          console.error('Error creating mentor:', error);
        }
      );
    }
  }
}
