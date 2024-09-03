import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { SentenceAssemblyExerciseWord } from 'src/app/util/models/sentence-assembly-exercise-word';
import { AnimationService } from 'src/app/util/services/animation.service';

@Component({
  selector: 'app-sentence-assembly-exercise',
  templateUrl: './sentence-assembly-exercise.component.html',
  styleUrls: ['./sentence-assembly-exercise.component.scss']
})
export class SentenceAssemblyExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container: QueryList<ElementRef> | undefined;
  
  @Output() showCorrectButton = new EventEmitter<void>();

  correctSentence: Array<SentenceAssemblyExerciseWord> = [];
  sentence: Array<SentenceAssemblyExerciseWord> = [
    { text: 'sentence', clicked: false, index: 4 },
    { text: 'a', clicked: false, index: 3 },
    { text: 'is', clicked: false, index: 2 },
    { text: 'This', clicked: false, index: 1 }
  ];
  clickedWords: Array<SentenceAssemblyExerciseWord> = [];

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.loadData();
  }

  putWord(index: number, removeFromSentence = false) {
    if (removeFromSentence) {
      this.sentence.map(w => {
        if (w === this.clickedWords[index]) {
          w.clicked = false;
        }
      });

      this.clickedWords.splice(index, 1);
    } else {
      this.sentence[index].clicked = true;
      this.clickedWords.push(this.sentence[index]);
    }
  }

  check() {
    const isCorrect = this.isSolutionCorrect();
    if (isCorrect) {
      this.showCorrectButton.emit();
    } else {
      this.animationService.rotateAnimation(this.container);
    }
  }

  private loadData() {
    this.correctSentence = [...this.sentence];
    this.correctSentence = this.correctSentence.sort(
      (a: SentenceAssemblyExerciseWord, b: SentenceAssemblyExerciseWord) =>
        a.index - b.index
    );
  }

  private isSolutionCorrect(): boolean {
    if (this.correctSentence.length !== this.clickedWords.length) {
      return false;
    }

    return this.correctSentence.every((word, index) => {
      const otherWord = this.clickedWords[index];
      const isCorrect =
        word.text === otherWord?.text &&
        word.clicked === otherWord?.clicked &&
        word.index === otherWord?.index;
      return isCorrect;
    });
  }
}
