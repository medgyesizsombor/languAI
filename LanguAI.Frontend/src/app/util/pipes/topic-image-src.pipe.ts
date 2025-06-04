import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topicImageSrc',
  standalone: false
})
export class TopicImageSrcPipe implements PipeTransform {
  transform(topicId: number): string {
    switch (topicId) {
      case 1:
      case 28:
      case 15: {
        return 'family';
      }
      case 2:
      case 29:
      case 14: {
        return 'family2';
      }
      case 3: {
        return 'daily-routine';
      }
      case 4:
      case 16: {
        return 'housing';
      }
      case 5:
      case 26: {
        return 'hobbies';
      }
      case 6:
      case 20: {
        return 'meals-and-services';
      }
      case 7:
      case 24:
      case 34: {
        return 'health-and-sport';
      }
      case 8:
      case 22: {
        return 'weather-and-clothing';
      }
      case 9:
      case 17:
      case 32: {
        return 'traffic';
      }
      case 10:
      case 21:
      case 33: {
        return 'entertainment';
      }
      case 11:
      case 25: {
        return 'telecommunication';
      }
      case 12: {
        return 'geography';
      }
      case 13: {
        return 'individual';
      }
      case 18:
      case 38: {
        return 'shopping';
      }
      case 19: {
        return 'communication';
      }
      case 23:
      case 35: {
        return 'health';
      }
      case 27:
      case 31: {
        return 'jobs';
      }
      case 30: {
        return 'education';
      }
      case 36: {
        return 'environment';
      }
      case 37: {
        return 'politics';
      }
      case 39: {
        return 'moral-issues';
      }
      case 40: {
        return 'holiday';
      }
      case 41: {
        return 'future';
      }
      default: {
        return 'asd';
      }
    }
  }
}
