import { TestBed } from '@angular/core/testing';

import { AnuncioService } from './anuncios.service';

describe('Home', () => {
  let service: AnuncioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnuncioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
