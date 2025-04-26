import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, OnChanges {
  @Input() imageString: string | undefined | null;
  @Input() type: string | undefined | null;

  imageSrc: string | undefined;

  constructor() {}

  ngOnInit() {
    if (this.imageString?.length && this.type?.length) {
      this.imageSrc = `data:image/${this.type};base64,${this.imageString}`;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.imageString?.length && this.type?.length) {
      this.imageSrc = `data:image/${this.type};base64,${this.imageString}`;
    }
  }
}
