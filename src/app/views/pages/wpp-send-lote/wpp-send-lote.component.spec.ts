import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WppSendLoteComponent } from './wpp-send-lote.component';

describe('WppSendLoteComponent', () => {
  let component: WppSendLoteComponent;
  let fixture: ComponentFixture<WppSendLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WppSendLoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WppSendLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
