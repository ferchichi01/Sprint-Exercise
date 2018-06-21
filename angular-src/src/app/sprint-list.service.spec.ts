import { TestBed, inject } from '@angular/core/testing';

import { SprintListService } from './services/sprint-list.service';

describe('SprintListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprintListService]
    });
  });

  it('should be created', inject([SprintListService], (service: SprintListService) => {
    expect(service).toBeTruthy();
  }));
});
