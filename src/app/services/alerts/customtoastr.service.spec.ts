import { TestBed } from '@angular/core/testing';

import { CustomtoastrService } from './customtoastr.service';

describe('CustomtoastrService', () => {
  let service: CustomtoastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomtoastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
