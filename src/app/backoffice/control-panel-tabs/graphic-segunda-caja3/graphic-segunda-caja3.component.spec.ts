import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicSegundaCaja3Component } from './graphic-segunda-caja3.component';

describe('GraphicSegundaCaja3Component', () => {
  let component: GraphicSegundaCaja3Component;
  let fixture: ComponentFixture<GraphicSegundaCaja3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicSegundaCaja3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicSegundaCaja3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
