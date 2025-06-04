import { Pipe, PipeTransform } from '@angular/core';
import { TopicOfCurrentLearningViewModel } from 'src/api/models';
import { HUNGARIAN_LANGUAGE_CODE } from '../util.constants';
import { LocalStorageService } from '../services/localstorage.service';

@Pipe({
  name: 'topicName',
  standalone: false
})
export class TopicNamePipe implements PipeTransform {
  constructor(private localStorageService: LocalStorageService) {}

  transform(topic: TopicOfCurrentLearningViewModel): string | undefined | null {
    return this.localStorageService.getMobileLanguageCode() ===
      HUNGARIAN_LANGUAGE_CODE
      ? topic.nameInHun
      : topic.name;
  }
}
