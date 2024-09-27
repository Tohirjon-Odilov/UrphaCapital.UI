import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HelpsService } from './helps.service'; // HelpsService import qilamiz
import { ToastrService } from 'ngx-toastr'; // Toastrni import qilamiz
import { HelpsService } from '../../../../services/help-services/helps.service';

@Component({
  selector: 'app-create-help',
  templateUrl: './create-help.component.html',
  styleUrls: ['./create-help.component.scss']
})
export class CreateHelpComponent {
  studentForm: FormGroup; // Forma uchun FormGroup
  selectedFileName: string = ''; // Fayl nomi
  file: File | null = null; // Fayl saqlash uchun
  isCreated = true; // Forma ko'rsatilish holati
  loading = false; // Tugma loading holati

  constructor(
    private formBuilder: FormBuilder, // FormBuilderni inject qilish
    private helpsService: HelpsService, // HelpsService injektsiya qilinadi
    private toastr: ToastrService // ToastrService injektsiya qilinadi
  ) {
    // Forma tuzish
    this.studentForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      studentId: ['', Validators.required],
      lessonId: ['', Validators.required],
      file: [null, Validators.required] // Fayl majburiy
    });
  }

  // Fayl tanlanganda ishlovchi funksiya
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.file = file; // Faylni saqlab qo'yish
    }
  }

  // Forma yuborilganda ishlovchi funksiya
  onSubmit() {
    if (this.studentForm.invalid || !this.file) {
      this.toastr.error('Formani to\'g\'ri to\'ldiring!', 'Xatolik');
      return;
    }

    const formData = new FormData(); // FormData obyektini yaratamiz

    // FormData'ga formadagi barcha ma'lumotlarni qo'shamiz
    formData.append('Title', this.studentForm.value.title);
    formData.append('Description', this.studentForm.value.description);
    formData.append('StudentId', this.studentForm.value.studentId);
    formData.append('LessonId', this.studentForm.value.lessonId);
    formData.append('FILE', this.file as File); // Tanlangan faylni qo'shamiz

    this.loading = true; // Yuborish jarayoni boshlandi

    // Service orqali formani yuborish
    this.helpsService.createHelp(formData).subscribe({
      next: () => {
        this.toastr.success('Yordam so\'rovi muvaffaqiyatli yuborildi!', 'Muvaffaqiyat');
        this.studentForm.reset(); // Forma tozalanadi
        this.selectedFileName = ''; // Fayl nomini tozalaymiz
        this.file = null; // Faylni null qilamiz
        this.loading = false; // Loading holatini o'chirish
      },
      error: () => {
        this.toastr.error('Yordam so\'rovi yuborishda xatolik yuz berdi!', 'Xatolik');
        this.loading = false; // Xatolik holatini o'chirish
      }
    });
  }
}
