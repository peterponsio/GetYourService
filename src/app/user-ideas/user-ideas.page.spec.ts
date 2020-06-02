import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserIdeasPage } from './user-ideas.page';

describe('UserIdeasPage', () => {
  let component: UserIdeasPage;
  let fixture: ComponentFixture<UserIdeasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdeasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserIdeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
