import { TestBed, inject } from '@angular/core/testing';

import { FlavorService } from './flavor.service';

describe('FlavorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlavorService]
    });
  });

  xit('should be created', inject([FlavorService], (service: FlavorService) => {
    // expect(service).toBeTruthy();
  }));
});
