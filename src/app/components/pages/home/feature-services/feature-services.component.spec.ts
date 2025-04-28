import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureServicesComponent } from './feature-services.component';

describe('FeatureServicesComponent', () => {
  let component: FeatureServicesComponent;
  let fixture: ComponentFixture<FeatureServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
