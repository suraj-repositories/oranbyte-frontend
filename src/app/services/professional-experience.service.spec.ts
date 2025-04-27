import { TestBed } from '@angular/core/testing';

import { ProfessionalExperienceService } from './professional-experience.service';

describe('ProfessionalExperienceService', () => {
  let service: ProfessionalExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
