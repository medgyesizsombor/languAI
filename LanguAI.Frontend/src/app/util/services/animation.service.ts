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

  async streakAnimation(
    previousStreakCard: ElementRef,
    newStreakCard: ElementRef
  ) {
    const previousStreakCardAnimation = this.animationController
      .create()
      .addElement(previousStreakCard.nativeElement)
      .fill('none')
      .duration(700)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.1, transform: 'scale(1.2)' },
        { offset: 0.2, transform: 'scale(1.5)' },
        { offset: 0.3, transform: 'scale(1.8)' },
        { offset: 0.4, transform: 'scale(2.1)' },
        { offset: 0.5, transform: 'scale(2.4)' },
        { offset: 0.6, transform: 'scale(2.7) rotate(-45deg)' },
        { offset: 0.65, transform: 'scale(3) rotate(45deg)' },
        { offset: 0.7, transform: 'scale(3.3) rotate(-45deg)' },
        { offset: 0.75, transform: 'scale(3.6) rotate(45deg)' },
        { offset: 0.8, transform: 'scale(3.9) rotate(-45deg)' },
        { offset: 0.85, transform: 'scale(5.1) rotate(0)' },
        { offset: 0.9, transform: 'scale(2.7) rotate(-45deg)' },
        { offset: 0.95, transform: 'scale(3) rotate(45deg)' },
        { offset: 1, transform: 'scale(3.3) rotate(0)' }
      ]);

    const newStreakAnimation = this.animationController
      .create()
      .addElement(newStreakCard.nativeElement)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(5.1)' },
        { offset: 0.1, transform: 'scale(3.9)' },
        { offset: 0.2, transform: 'scale(3.6)' },
        { offset: 0.3, transform: 'scale(3.3)' },
        { offset: 0.4, transform: 'scale(3)' },
        { offset: 0.5, transform: 'scale(2.7)' },
        { offset: 0.6, transform: 'scale(2.4)' },
        { offset: 0.7, transform: 'scale(2.1)' },
        { offset: 0.8, transform: 'scale(1.8)' },
        { offset: 0.9, transform: 'scale(1.5)' },
        { offset: 0.95, transform: 'scale(1.2)' },
        { offset: 1, transform: 'scale(1)' }
      ]);

    const firstAnimation = this.animationController
      .create()
      .duration(2000)
      .addAnimation([previousStreakCardAnimation!]);

    const secondAnimation = this.animationController
      .create()
      .duration(2000)
      .addAnimation([newStreakAnimation!]);

    previousStreakCard.nativeElement.style.visibility = 'visible';
    await firstAnimation.play();

    previousStreakCard.nativeElement.style.visibility = 'hidden';
    newStreakCard.nativeElement.style.visibility = 'visible';
    await secondAnimation.play();
  }
}
