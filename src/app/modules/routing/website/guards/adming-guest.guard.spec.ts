import { TestBed } from '@angular/core/testing';

import { AdmingGuestGuard } from './adming-guest.guard';

describe('AdmingGuestGuard', () => {
  let guard: AdmingGuestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdmingGuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
