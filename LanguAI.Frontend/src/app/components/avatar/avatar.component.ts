import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: false
})
export class AvatarComponent {
  @Input() imageSrc: string | undefined;
  @Input() heightInPx = 100;
  @Input() widthInPx = 100;
  @Input() marginClass: string | null = 'me-2';

  constructor() {}
}
