import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensaggesPage } from './mensagges.page';

describe('MensaggesPage', () => {
  let component: MensaggesPage;
  let fixture: ComponentFixture<MensaggesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensaggesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensaggesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
