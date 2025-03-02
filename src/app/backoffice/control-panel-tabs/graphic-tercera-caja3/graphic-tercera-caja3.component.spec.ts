import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicTerceraCaja3Component } from './graphic-tercera-caja3.component';

describe('GraphicTerceraCaja3Component', () => {
  let component: GraphicTerceraCaja3Component;
  let fixture: ComponentFixture<GraphicTerceraCaja3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicTerceraCaja3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicTerceraCaja3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
