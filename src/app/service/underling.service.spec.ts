import { TestBed } from '@angular/core/testing';

import { UnderlingService } from './underling.service';

describe('UnderlingService', () => {
  let service: UnderlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnderlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
