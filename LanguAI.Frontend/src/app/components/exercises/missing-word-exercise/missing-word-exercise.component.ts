import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AnimationService } from 'src/app/util/services/animation.service';

@Component({
  selector: 'app-missing-word-exercise',
  templateUrl: './missing-word-exercise.component.html',
  styleUrls: ['./missing-word-exercise.component.scss']
})
export class MissingWordExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container: QueryList<ElementRef> | undefined;
  
  @Output() showCorrectButton = new EventEmitter<void>();

  firstPartOfSentence = 'Click on the';
  secondPartOfSentence = 'word';
  words = ['asd', 'asdasd', 'asddsa', 'dsa', 'asd', 'asddsa', 'dsa'];
  correctWord = 'asdasd';
  isCorrect: boolean | null = null;

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.loadData();
  }

  /**
   * Check if the selected word is correct
   */
  checkWord(index: number) {
    if (this.correctWord === this.words[index]) {
      this.isCorrect = true;
      this.showCorrectButton.emit();
    } else {
      this.isCorrect = false;
      this.animationService.rotateAnimation(this.container);
    }
  }

  /**
   * Loading the data
   */
  private loadData() {}
}
