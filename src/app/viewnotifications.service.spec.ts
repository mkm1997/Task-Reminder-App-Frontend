import { TestBed } from '@angular/core/testing';

import { ViewnotificationsService } from './viewnotifications.service';

describe('ViewnotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewnotificationsService = TestBed.get(ViewnotificationsService);
    expect(service).toBeTruthy();
  });
});
