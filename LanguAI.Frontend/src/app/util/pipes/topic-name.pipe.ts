import { Pipe, PipeTransform } from '@angular/core';
import { TopicOfCurrentLearningViewModel } from 'src/api/models';
import { LocalDataService } from '../services/local-data.service';
import { HUNGARIAN_LANGUAGE_ID } from '../util.constants';

@Pipe({
  name: 'topicName'
})
export class TopicNamePipe implements PipeTransform {
  constructor(private localDataService: LocalDataService) {}

  transform(topic: TopicOfCurrentLearningViewModel): string | undefined | null {
    return this.localDataService.nativeLanguageId === HUNGARIAN_LANGUAGE_ID
      ? topic.nameInHun
      : topic.name;
  }
}
