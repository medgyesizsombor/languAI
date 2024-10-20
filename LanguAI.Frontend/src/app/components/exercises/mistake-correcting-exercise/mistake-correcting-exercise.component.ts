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
  selector: 'app-mistake-correcting-exercise',
  templateUrl: './mistake-correcting-exercise.component.html',
  styleUrls: ['./mistake-correcting-exercise.component.scss']
})
export class MistakeCorrectingExerciseComponent implements OnInit {
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
