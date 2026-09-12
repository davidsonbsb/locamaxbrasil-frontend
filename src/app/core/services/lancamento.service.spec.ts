import { TestBed } from '@angular/core/testing';

import { LancamentoServiceService } from './lancamento.service';

describe('LancamentoServiceService', () => {
  let service: LancamentoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LancamentoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
