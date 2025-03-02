import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPrimeraCaja3Component } from './graphic-primera-caja3.component';

describe('GraphicPrimeraCaja3Component', () => {
  let component: GraphicPrimeraCaja3Component;
  let fixture: ComponentFixture<GraphicPrimeraCaja3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicPrimeraCaja3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicPrimeraCaja3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
