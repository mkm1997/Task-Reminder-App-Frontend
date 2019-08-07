import { TestBed } from '@angular/core/testing';

import { CreatetaskService } from './createtask.service';

describe('CreatetaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatetaskService = TestBed.get(CreatetaskService);
    expect(service).toBeTruthy();
  });
});
