import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; 
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CoverComponent } from './core/cover/cover.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './core/product/product.component';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './core/filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    FaqComponent,
    FooterComponent, 
    HeaderComponent,
    CoverComponent,
    RegisterComponent,
    ProductComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), 
    CarouselModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }