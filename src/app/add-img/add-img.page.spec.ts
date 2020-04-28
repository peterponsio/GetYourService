import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddImgPage } from './add-img.page';

describe('AddImgPage', () => {
  let component: AddImgPage;
  let fixture: ComponentFixture<AddImgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddImgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
