import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [HeaderComponent],
  imports: [IonicModule.forRoot(), TranslateModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [TranslateModule, FontAwesomeModule, ReactiveFormsModule, HeaderComponent],
})
export class UtilModule {}
