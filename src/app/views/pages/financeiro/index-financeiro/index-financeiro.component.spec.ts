import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFinanceiroComponent } from './index-financeiro.component';

describe('IndexFinanceiroComponent', () => {
  let component: IndexFinanceiroComponent;
  let fixture: ComponentFixture<IndexFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexFinanceiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
