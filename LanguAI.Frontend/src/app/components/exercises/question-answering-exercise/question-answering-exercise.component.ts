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
  styleUrls: ['./question-answering-exercise.component.scss']
})
export class QuestionAnsweringExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container:
    | QueryList<ElementRef>
    | undefined;

  @Input() exercise: ExerciseViewModel | undefined;
  @Output() showCorrectButton = new EventEmitter<void>();

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    this.loadData;
  }

  checkSentence(sentence: IsCorrectAndTextSentenceViewModel) {
    if (sentence.isCorrect) {
      this.showCorrectButton.emit();
    } else {
      this.animationService.rotateAnimation(this.container);
    }
  }

  private loadData() {}
}
