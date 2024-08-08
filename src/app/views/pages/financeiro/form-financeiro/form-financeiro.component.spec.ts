import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFinanceiroComponent } from './form-financeiro.component';

describe('ShowFinanceiroComponent', () => {
  let component: ShowFinanceiroComponent;
  let fixture: ComponentFixture<ShowFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowFinanceiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
