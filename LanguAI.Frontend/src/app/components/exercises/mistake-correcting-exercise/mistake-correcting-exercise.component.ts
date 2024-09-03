import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { MistakeCorrectingSentence } from 'src/app/util/models/mistake-correcting-sentence';
import { AnimationService } from 'src/app/util/services/animation.service';

@Component({
  selector: 'app-mistake-correcting-exercise',
  templateUrl: './mistake-correcting-exercise.component.html',
  styleUrls: ['./mistake-correcting-exercise.component.scss']
})
export class MistakeCorrectingExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container:
    | QueryList<ElementRef>
    | undefined;

  @Output() showCorrectButton = new EventEmitter<void>();

  mainSentence: string = 'This are a good sentence.';
  sentences: Array<MistakeCorrectingSentence> = [
    { isCorrect: true, text: 'This is a good sentence.' },
    { isCorrect: false, text: 'This is an good sentence.' },
    { isCorrect: false, text: 'This is a good sentences.' },
    { isCorrect: false, text: 'This is a goods sentece.' }
  ];

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.loadData;
  }

  checkSentence(sentence: MistakeCorrectingSentence) {
    if (sentence.isCorrect) {
      this.showCorrectButton.emit();
    } else {
      this.animationService.rotateAnimation(this.container);
    }
  }

  private loadData() {}
}
