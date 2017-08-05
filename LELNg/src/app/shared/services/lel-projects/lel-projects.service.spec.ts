import { TestBed, inject } from '@angular/core/testing';

import { LelProjectsService } from './lel-projects.service';

describe('LelProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LelProjectsService]
    });
  });

  it('should ...', inject([LelProjectsService], (service: LelProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
