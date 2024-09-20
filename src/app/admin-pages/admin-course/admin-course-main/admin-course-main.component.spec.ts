import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseMainComponent } from './admin-course-main.component';

describe('AdminCourseMainComponent', () => {
  let component: AdminCourseMainComponent;
  let fixture: ComponentFixture<AdminCourseMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCourseMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCourseMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
