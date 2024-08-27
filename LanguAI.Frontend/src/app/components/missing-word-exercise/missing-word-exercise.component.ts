import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-missing-word-exercise',
  templateUrl: './missing-word-exercise.component.html',
  styleUrls: ['./missing-word-exercise.component.scss']
})
export class MissingWordExerciseComponent implements OnInit {
  @Output() showCorrectButton = new EventEmitter<void>();

  firstPartOfSentence = 'Click on the';
  secondPartOfSentence = 'word';
  words = ['asd', 'asdasd', 'asddsa', 'dsa', 'asd', 'asddsa', 'dsa'];
  correctWord = 'asdasd';
  isCorrect: boolean | null = null;

  constructor() {}

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
    }
  }

  /**
   * Loading the data
   */
  private loadData() {}
}
