import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorqueeAnnoucmentComponent } from './morquee-annoucment.component';

describe('MorqueeAnnoucmentComponent', () => {
  let component: MorqueeAnnoucmentComponent;
  let fixture: ComponentFixture<MorqueeAnnoucmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MorqueeAnnoucmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MorqueeAnnoucmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
