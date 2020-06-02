import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailSupportPage } from './email-support.page';

describe('EmailSupportPage', () => {
  let component: EmailSupportPage;
  let fixture: ComponentFixture<EmailSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSupportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
