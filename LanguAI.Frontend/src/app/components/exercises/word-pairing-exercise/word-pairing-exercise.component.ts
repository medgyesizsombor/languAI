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
import { CardViewModel, ExerciseViewModel } from 'src/api/models';
import { WordPairingExerciseWord } from 'src/app/util/models/word-pairing-exercise-word';
import { AnimationService } from 'src/app/util/services/animation.service';

@Component({
  selector: 'app-word-pairing-exercise',
  templateUrl: './word-pairing-exercise.component.html',
  styleUrls: ['./word-pairing-exercise.component.scss'],
  standalone: false
})
export class WordPairingExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container:
    | QueryList<ElementRef>
    | undefined;

  @Input() exercise: ExerciseViewModel | undefined;
  @Output() showContinueButton = new EventEmitter<number>();

  clickedWord: WordPairingExerciseWord | null = null;
  nativeWords: Array<WordPairingExerciseWord> = [];
  learningWords: Array<WordPairingExerciseWord> = [];
  originalWords: Array<CardViewModel> = [];
  mistakes: number = 0;

  leftColors: Array<string> = ['#EDAFB8', '#FDCA40', '#F79824', '#F1DAC4'];
  rigthColors: Array<string> = ['#32CBFF', '#EF9CDA', '#8AB9B5', '#F4F1BB'];

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    if (this.exercise?.wordPairingExercise?.length) {
      this.originalWords = [...this.exercise?.wordPairingExercise];

      this.originalWords.forEach((w, index) => {
        this.nativeWords.push({
          text: w.wordInNativeLanguage!,
          pair: index,
          paired: false,
          nativeWord: true
        });
        this.learningWords.push({
          text: w.wordInLearningLanguage!,
          pair: index,
          paired: false,
          nativeWord: false
        });
      });

      this.learningWords = [...this.randomizeArray(this.learningWords)];
    }
  }

  randomizeArray(wordArray: Array<WordPairingExerciseWord>) {
    return [...wordArray]
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
  }

  wordClicked(word: WordPairingExerciseWord) {
    if (!this.clickedWord) {
      this.clickedWord = word;
      return;
    }

    if (this.clickedWord.text === word?.text) {
      this.clickedWord = null;
      return;
    }

    if (this.clickedWord.nativeWord === word.nativeWord) {
      this.clickedWord = word;
      return;
    }

    if (word.pair === this.clickedWord.pair) {
      this.learningWords.find(w => w.pair === word.pair)!.paired = true;
      this.nativeWords.find(w => w.pair === word.pair)!.paired = true;
      this.clickedWord = null;
    } else {
      this.animationService.rotateAnimation(this.container);
      this.clickedWord = null;
      this.mistakes++;
    }

    if (this.nativeWords.every(w => w.paired)) {
      this.showContinueButton.emit(this.mistakes);
    }
  }
}
