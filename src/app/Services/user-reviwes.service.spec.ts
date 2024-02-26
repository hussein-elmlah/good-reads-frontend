import { TestBed } from '@angular/core/testing';

import { UserReviwesService } from './user-reviwes.service';

describe('UserReviwesService', () => {
  let service: UserReviwesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReviwesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
