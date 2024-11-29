import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerLayoutComponent } from './customer-layout.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomerLayoutComponent', () => {
  let component: CustomerLayoutComponent;
  let fixture: ComponentFixture<CustomerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerLayoutComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
