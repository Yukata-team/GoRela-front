import { TestBed } from '@angular/core/testing';

import { RelasionService } from './relasion.service';

describe('RelasionService', () => {
  let service: RelasionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelasionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
