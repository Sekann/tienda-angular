import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAjusteComponent } from './tab-ajuste.component';

describe('TabAjusteComponent', () => {
  let component: TabAjusteComponent;
  let fixture: ComponentFixture<TabAjusteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabAjusteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabAjusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
