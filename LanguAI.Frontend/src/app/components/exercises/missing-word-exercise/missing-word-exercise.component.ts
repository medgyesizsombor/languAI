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
import { AnimationService } from 'src/app/util/services/animation.service';

@Component({
  selector: 'app-missing-word-exercise',
  templateUrl: './missing-word-exercise.component.html',
  styleUrls: ['./missing-word-exercise.component.scss'],
  standalone: false
})
export class MissingWordExerciseComponent implements OnInit {
  @ViewChildren('container', { read: ElementRef }) container:
    | QueryList<ElementRef>
    | undefined;

  @Input() exercise: ExerciseViewModel | undefined;
  @Output() showContinueButton = new EventEmitter<number>();

  mistakes: number = 0;
  isCorrect: boolean | null = null;
  colors: Array<string> = ['#EDAFB8', '#FDCA40', '#F79824', '#F1DAC4'];

  constructor(private animationService: AnimationService) {}

  ngOnInit() {}

  /**
   * Check if the selected word is correct
   */
  checkWord(word: string) {
    if (this.exercise?.correctWord === word) {
      this.isCorrect = true;
      this.showContinueButton.emit(this.mistakes);
    } else {
      this.isCorrect = false;
      this.mistakes++;
      this.animationService.rotateAnimation(this.container);
    }
  }
}
