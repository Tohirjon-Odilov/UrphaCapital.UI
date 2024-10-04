import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeworkCreateComponent } from './admin-homework-create.component';

describe('AdminHomeworkCreateComponent', () => {
  let component: AdminHomeworkCreateComponent;
  let fixture: ComponentFixture<AdminHomeworkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHomeworkCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminHomeworkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
