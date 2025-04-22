import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationSummeryComponent } from './education-summery.component';

describe('EducationSummeryComponent', () => {
  let component: EducationSummeryComponent;
  let fixture: ComponentFixture<EducationSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationSummeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
