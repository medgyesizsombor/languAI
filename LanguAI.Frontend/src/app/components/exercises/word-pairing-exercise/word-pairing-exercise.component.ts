import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CardViewModel } from 'src/api/models';
import { WordPairingExerciseWord } from 'src/app/util/models/word-pairing-exercise-word';
import { AnimationService } from 'src/app/util/services/animation.service';

@Component({
  selector: 'app-word-pairing-exercise',
  templateUrl: './word-pairing-exercise.component.html',
  styleUrls: ['./word-pairing-exercise.component.scss']
})
export class WordPairingExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container:
    | QueryList<ElementRef>
    | undefined;

  @Output() showCorrectButton = new EventEmitter<void>();

  clickedWord: WordPairingExerciseWord | null = null;
  nativeWords: Array<WordPairingExerciseWord> = [];
  learningWords: Array<WordPairingExerciseWord> = [];
  originalWords: Array<CardViewModel> = [
    { wordInLearningLanguage: 'hungarian', wordInNativeLanguage: 'magyar' },
    { wordInLearningLanguage: 'english', wordInNativeLanguage: 'angol' },
    { wordInLearningLanguage: 'german', wordInNativeLanguage: 'német' }
  ];
  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
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
    }

    if (this.nativeWords.every(w => w.paired)) {
      this.showCorrectButton.emit();
    }
  }
}
