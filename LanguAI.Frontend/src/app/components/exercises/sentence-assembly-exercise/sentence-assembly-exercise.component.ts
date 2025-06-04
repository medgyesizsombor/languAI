import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { ExerciseViewModel } from 'src/api/models';
import { SentenceAssemblyExerciseWord } from 'src/api/models/sentence-assembly-exercise-word';
import { AnimationService } from 'src/app/util/services/animation.service';
import { LoadingService } from 'src/app/util/services/loading.service';

@Component({
  selector: 'app-sentence-assembly-exercise',
  templateUrl: './sentence-assembly-exercise.component.html',
  styleUrls: ['./sentence-assembly-exercise.component.scss'],
  standalone: false
})
export class SentenceAssemblyExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container:
    | QueryList<ElementRef>
    | undefined;

  @Input() exercise: ExerciseViewModel | undefined;
  @Output() showContinueButton = new EventEmitter<number>();

  mistakes: number = 0;
  correctSentence: Array<SentenceAssemblyExerciseWord> = [];
  clickedWords: Array<SentenceAssemblyExerciseWord> = [];
  colors: Array<string> = [
    '#EDAFB8',
    '#E4572E',
    '#FDCA40',
    '#F79824',
    '#F1DAC4',
    '#B185A7'
  ];

  constructor(
    private animationService: AnimationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  putWord(index: number, removeFromSentence = false) {
    if (removeFromSentence) {
      this.exercise?.sentenceAssemblyExerciseSentence?.map(w => {
        if (w === this.clickedWords[index]) {
          w.clicked = false;
        }
      });

      this.clickedWords.splice(index, 1);
    } else {
      if (this.exercise?.sentenceAssemblyExerciseSentence?.[index]) {
        this.exercise.sentenceAssemblyExerciseSentence[index].clicked = true;
        this.clickedWords.push(
          this.exercise.sentenceAssemblyExerciseSentence[index]
        );
      }
    }
  }

  /**
   * Check if the solution is correct
   */
  check() {
    const isCorrect = this.isSolutionCorrect();
    if (isCorrect) {
      this.showContinueButton.emit(this.mistakes);
    } else {
      this.mistakes++;
      this.animationService.rotateAnimation(this.container);
    }
  }

  /**
   * Load data
   */
  private async loadData() {
    if (this.exercise?.mainSentence) {
      await this.loadingService.showLoading('EXERCISE_IS_LOADING');
      this.exercise.sentenceAssemblyExerciseSentence = [...this.mapTheWords()];
      this.correctSentence = [
        ...this.exercise.sentenceAssemblyExerciseSentence
      ];

      this.exercise.sentenceAssemblyExerciseSentence = [
        ...this.shuffleTheElements(
          this.exercise.sentenceAssemblyExerciseSentence
        )
      ];

      this.loadingService.hideLoading();
    }
  }

  /**
   * Check if the solution is correct
   */
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

  private mapTheWords(): Array<SentenceAssemblyExerciseWord> {
    const words = this.exercise?.mainSentence?.split(' ');

    if (words?.length) {
      return words?.map((text, index) => ({
        clicked: false,
        index,
        text
      }));
    }

    return [];
  }

  /**
   * Shuffle the elements of the array
   */
  private shuffleTheElements(
    sentence: Array<SentenceAssemblyExerciseWord>
  ): Array<SentenceAssemblyExerciseWord> {
    if (sentence?.length) {
      let currentIndex = sentence?.length;

      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [sentence[currentIndex], sentence[randomIndex]] = [
          sentence[randomIndex],
          sentence[currentIndex]
        ];
      }

      return sentence;
    } else {
      return sentence;
    }
  }
}
