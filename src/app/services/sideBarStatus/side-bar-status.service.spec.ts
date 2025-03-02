import { TestBed } from '@angular/core/testing';

import { SideBarStatusService } from './side-bar-status.service';

describe('SideBarStatusService', () => {
  let service: SideBarStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideBarStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
