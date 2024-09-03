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
  selector: 'app-question-answering-exercise',
  templateUrl: './question-answering-exercise.component.html',
  styleUrls: ['./question-answering-exercise.component.scss']
})
export class QuestionAnsweringExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container:
    | QueryList<ElementRef>
    | undefined;

  @Output() showCorrectButton = new EventEmitter<void>();

  mainSentence: string = 'This is a question?';
  sentences: Array<MistakeCorrectingSentence> = [
    { isCorrect: true, text: 'Yes, it is.' },
    { isCorrect: false, text: 'However I have a headache.' },
    { isCorrect: false, text: 'That are not a good question.' },
    { isCorrect: false, text: 'I have an umbrella.' }
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
