import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
