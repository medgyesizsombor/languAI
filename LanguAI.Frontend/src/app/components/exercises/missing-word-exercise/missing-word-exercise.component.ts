import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ExerciseViewModel } from 'src/api/models';
import { AnimationService } from 'src/app/util/services/animation.service';

@Component({
  selector: 'app-missing-word-exercise',
  templateUrl: './missing-word-exercise.component.html',
  styleUrls: ['./missing-word-exercise.component.scss']
})
export class MissingWordExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container: QueryList<ElementRef> | undefined;
  
  @Input() exercise: ExerciseViewModel | undefined;
  @Output() showCorrectButton = new EventEmitter<void>();

  isCorrect: boolean | null = null;

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.loadData();
  }

  /**
   * Check if the selected word is correct
   */
  checkWord(word: string) {
    if (this.exercise?.correctWord === word) {
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
