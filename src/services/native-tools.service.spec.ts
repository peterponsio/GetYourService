import { TestBed } from '@angular/core/testing';

import { NativeToolsService } from './native-tools.service';

describe('NativeToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeToolsService = TestBed.get(NativeToolsService);
    expect(service).toBeTruthy();
  });
});
