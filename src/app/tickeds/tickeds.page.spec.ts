import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TickedsPage } from './tickeds.page';

describe('TickedsPage', () => {
  let component: TickedsPage;
  let fixture: ComponentFixture<TickedsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickedsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TickedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
