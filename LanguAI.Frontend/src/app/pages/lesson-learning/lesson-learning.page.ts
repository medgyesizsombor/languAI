import { Component, OnInit } from '@angular/core';
import { ExerciseTypeEnum } from 'src/app/util/enums/exercise-type.enum';

@Component({
  selector: 'app-lesson-learning',
  templateUrl: './lesson-learning.page.html',
  styleUrls: ['./lesson-learning.page.scss']
})
export class LessonLearningPage implements OnInit {
  currentExercise: ExerciseTypeEnum | undefined;
  exerciseTypeEnum = ExerciseTypeEnum;
  exercises: Array<ExerciseTypeEnum> | undefined;
  showOverlay = false;

  constructor() {}

  ngOnInit() {}

  showContinueButton() {
    this.showOverlay = true;
  }

  nextExercise() {
    this.showOverlay = false;
  }
}
