import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CardSwiperComponent } from '../components/card-swiper/card-swiper.component';
import { EditFabComponent } from '../components/edit-fab/edit-fab.component';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';
import { MissingWordExerciseComponent } from '../components/exercises/missing-word-exercise/missing-word-exercise.component';
import { SentenceAssemblyExerciseComponent } from '../components/exercises/sentence-assembly-exercise/sentence-assembly-exercise.component';
import { WordPairingExerciseComponent } from '../components/exercises/word-pairing-exercise/word-pairing-exercise.component';
import { MistakeCorrectingExerciseComponent } from '../components/exercises/mistake-correcting-exercise/mistake-correcting-exercise.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    HeaderComponent,
    CardSwiperComponent,
    EditFabComponent,
    ProgressBarComponent,
    MissingWordExerciseComponent,
    SentenceAssemblyExerciseComponent,
    WordPairingExerciseComponent,
    MistakeCorrectingExerciseComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    TranslateModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HeaderComponent,
    CardSwiperComponent,
    EditFabComponent,
    ProgressBarComponent,
    MissingWordExerciseComponent,
    SentenceAssemblyExerciseComponent,
    WordPairingExerciseComponent,
    MistakeCorrectingExerciseComponent
  ]
})
export class UtilModule {}
