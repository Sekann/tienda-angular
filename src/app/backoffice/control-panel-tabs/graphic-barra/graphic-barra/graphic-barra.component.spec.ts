import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicBarraComponent } from './graphic-barra.component';

describe('GraphicBarraComponent', () => {
  let component: GraphicBarraComponent;
  let fixture: ComponentFixture<GraphicBarraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicBarraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
