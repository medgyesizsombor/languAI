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
  @Output() showContinueButton = new EventEmitter<void>();

  correctSentence: Array<SentenceAssemblyExerciseWord> = [];
  clickedWords: Array<SentenceAssemblyExerciseWord> = [];

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
      this.showContinueButton.emit();
    } else {
      this.animationService.rotateAnimation(this.container);
    }
  }

  /**
   * Load data
   */
  private async loadData() {
    if (this.exercise?.sentenceAssemblyExerciseSentence) {
      await this.loadingService.showLoading('EXERCISE_IS_LOADING');
      this.exercise.sentenceAssemblyExerciseSentence = [
        ...this.mapTheIndexOfWords(
          this.exercise?.sentenceAssemblyExerciseSentence
        )
      ];
      this.correctSentence = [
        ...this.exercise.sentenceAssemblyExerciseSentence
      ];

      this.exercise.sentenceAssemblyExerciseSentence = [
        ...this.shuffleTheElements(
          this.exercise.sentenceAssemblyExerciseSentence
        )
      ];
      this.loadingService.hideLoading();
    } else {
      //TODO mi van, ha nem tölt be
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

  /**
   * Map the index of the words
   */
  private mapTheIndexOfWords(
    sentence: Array<SentenceAssemblyExerciseWord>
  ): Array<SentenceAssemblyExerciseWord> {
    if (sentence?.length) {
      return sentence.map((s: SentenceAssemblyExerciseWord, i: number) => {
        s.index = i;
        return s;
      });
    } else {
      return [];
    }
  }

  /**
   * Shuffle the elements of the array
   */
  private shuffleTheElements(
    sentence: Array<SentenceAssemblyExerciseWord>
  ): Array<SentenceAssemblyExerciseWord> {
    if (sentence?.length > 1) {
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
