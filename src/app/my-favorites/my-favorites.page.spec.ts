import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyFavoritesPage } from './my-favorites.page';

describe('MyFavoritesPage', () => {
  let component: MyFavoritesPage;
  let fixture: ComponentFixture<MyFavoritesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavoritesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyFavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
