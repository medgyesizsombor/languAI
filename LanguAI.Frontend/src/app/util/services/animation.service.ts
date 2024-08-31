import { ElementRef, Injectable, QueryList } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Animation } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  animation: Animation | undefined;

  constructor(private animationController: AnimationController) {}

  rotateAnimation(elementRef: QueryList<ElementRef> | undefined) {
    const container = this.animationController
      .create()
      .addElement(elementRef?.get(0)?.nativeElement)
      .duration(300)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 0.2, transform: 'rotate(5deg)' },
        { offset: 0.4, transform: 'rotate(-5deg)' },
        { offset: 0.6, transform: 'rotate(5deg)' },
        { offset: 0.8, transform: 'rotate(-5deg)' },
        { offset: 1, transform: 'rotate(0deg)' }
      ]);

    this.animation = this.animationController
      .create()
      .duration(2000)
      .addAnimation([container]);

    this.animation.play();
  }
}
