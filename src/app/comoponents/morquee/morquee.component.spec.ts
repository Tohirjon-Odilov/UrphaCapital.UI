import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorqueeComponent } from './morquee.component';

describe('MorqueeComponent', () => {
  let component: MorqueeComponent;
  let fixture: ComponentFixture<MorqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MorqueeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MorqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
