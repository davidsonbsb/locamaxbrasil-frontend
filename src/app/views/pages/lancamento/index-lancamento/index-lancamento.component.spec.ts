import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexLancamentoComponent } from './index-lancamento.component';

describe('IndexLancamentoComponent', () => {
  let component: IndexLancamentoComponent;
  let fixture: ComponentFixture<IndexLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexLancamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
