import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProjectsComponent } from './popular-projects.component';

describe('PopularProjectsComponent', () => {
  let component: PopularProjectsComponent;
  let fixture: ComponentFixture<PopularProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
