import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorInformsPage } from './error-informs.page';

describe('ErrorInformsPage', () => {
  let component: ErrorInformsPage;
  let fixture: ComponentFixture<ErrorInformsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorInformsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorInformsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
