import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(() => {

   TestBed.configureTestingModule({
    declarations: [AppComponent],
  });
  fixture = TestBed.createComponent(AppComponent);
  app = fixture.componentInstance;
  fixture.detectChanges();

  });

  it('should create the app', () => {  
    expect(app).toBeTruthy();
  });

  it('should have as title', () => {
    expect(app.title).toBeDefined();
    expect(app.title).toBe('Babloo_Fullstack_SmallProject_June24');
  });
});
