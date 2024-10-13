import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective
} from '@coreui/angular';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselControlComponent, RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})

export class SliderComponent implements OnInit{
  slides: any[] = new Array(2).fill({ id: -1, src: '', title: '', subtitle: ''});

  ngOnInit(): void {
    this.slides[0] = {
      src: './assets/img/banner-1.jpg'
    };
    this.slides[1] = {
      src: './assets/img/banner-2.jpg'
    };
  }
}
