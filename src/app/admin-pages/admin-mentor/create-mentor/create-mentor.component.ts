import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MentorAuthService } from '../../../../services/mentor-services/mentor-auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-mentor',
  templateUrl: './create-mentor.component.html',
  styleUrls: ['./create-mentor.component.scss'],
})
export class CreateMentorComponent {
  mentorForm: FormGroup;
  selectedFile: File | null = null;
  mentorId: string | null = null;
  selectedFileName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorAuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.mentorForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      passwordHash: ['', Validators.required],
      picture: [null],
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.mentorId = queryParams['mentorId'] || null;
    });

    if (this.mentorId) {
      this.isCreated = false;
    }
  }

  ngOnInit(): void {
    if (this.mentorId) {
      this.mentorService.getMentorById(Number(this.mentorId)).subscribe({
        next: (data) => {
          this.mentorForm.patchValue(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
    }
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

  // ================== Update mentor =================

  isCreated = true;

  updateMentor() {
    const updateMentorForm = new FormData();
    updateMentorForm.append('id', this.mentorId?.toString() || '');
    updateMentorForm.append('name', this.mentorForm.get('name')?.value);
    updateMentorForm.append(
      'description',
      this.mentorForm.get('description')?.value
    );
    updateMentorForm.append('email', this.mentorForm.get('email')?.value);
    updateMentorForm.append(
      'phoneNumber',
      this.mentorForm.get('phoneNumber')?.value
    );
    updateMentorForm.append(
      'passwordHash',
      this.mentorForm.get('passwordHash')?.value
    );

    if (this.selectedFile) {
      updateMentorForm.append('picture', this.selectedFile);
    }

    this.mentorService.updateMentor(this.mentorForm.value).subscribe({
      next: (res) => {
        this.toastr.success(
          "Mentor muvaffaqiyatli o'zgartirildi",
          "O'zgartirildi"
        );
        console.log("Mentor o'zgartirildi:", res);
      },
      error: (err) => {
        this.toastr.error("Mentorni o'zgartirishda xato yuz berdi", 'Xato');
        console.error('Xato yuz berdi:', err);
      },
    });
  }
}
