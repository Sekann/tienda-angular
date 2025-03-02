import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAppsComponent } from './tab-apps.component';

describe('TabAppsComponent', () => {
  let component: TabAppsComponent;
  let fixture: ComponentFixture<TabAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
