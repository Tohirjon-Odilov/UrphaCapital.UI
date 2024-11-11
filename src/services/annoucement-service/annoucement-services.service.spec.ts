import { TestBed } from '@angular/core/testing';

import { AnnoucementServicesService } from './annoucement-services.service';

describe('AnnoucementServicesService', () => {
  let service: AnnoucementServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnoucementServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
