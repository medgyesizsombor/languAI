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
import {
  ExerciseViewModel,
  IsCorrectAndTextSentenceViewModel
} from 'src/api/models';
import { AnimationService } from 'src/app/util/services/animation.service';

@Component({
  selector: 'app-question-answering-exercise',
  templateUrl: './question-answering-exercise.component.html',
  styleUrls: ['./question-answering-exercise.component.scss'],
  standalone: false
})
export class QuestionAnsweringExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container:
    | QueryList<ElementRef>
    | undefined;

  @Input() exercise: ExerciseViewModel | undefined;
  @Output() showContinueButton = new EventEmitter<number>();

  mistakes: number = 0;
  colors: Array<string> = ['#EDAFB8', '#FDCA40', '#F79824', '#F1DAC4'];

  constructor(private animationService: AnimationService) {}

  ngOnInit() {}

  checkSentence(sentence: IsCorrectAndTextSentenceViewModel) {
    if (sentence.isCorrect) {
      this.showContinueButton.emit(this.mistakes);
    } else {
      this.mistakes++;
      this.animationService.rotateAnimation(this.container);
    }
  }
}
