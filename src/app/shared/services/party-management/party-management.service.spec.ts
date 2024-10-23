import { TestBed } from '@angular/core/testing';

import { PartyManagementService } from './party-management.service';

describe('PartyManagementService', () => {
  let service: PartyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
