import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/util/services/alert.service';
import { LESSONS_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() useNavController = false;
  @Input() showBackArrow = false;
  @Input() showSaveButton = false;
  @Input() showAddButton = false;
  @Input() showSavingMissed = false;
  @Input() showSendingMissed = false;
  @Input() showMessageButton = false;
  @Input() fontSizeClass: string | null = 'fs-32';
  @Input() navigateBackRouter = LESSONS_NAVIGATION;

  @Output() saveButtonEmit = new EventEmitter<void>();
  @Output() addButtonEmit = new EventEmitter<void>();
  @Output() navigateBackWithoutSavingEmit = new EventEmitter<boolean>();
  @Output() sendMessageButtonEmit = new EventEmitter<void>();

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {}

  navigateBack() {
    if (this.showSavingMissed) {
      this.alertService.showSavingMissedAlert().then(quit => {
        if (quit) {
          this.navigateBackWithoutSavingEmit.emit(true);
        } else {
          return;
        }
      });
    } else if (this.showSendingMissed) {
      this.alertService.showSendingMissedAlert().then(quit => {
        if (quit) {
          this.navigateBackWithoutSavingEmit.emit(true);
        } else {
          return;
        }
      });
    } else {
      this.router.navigate(['/' + this.navigateBackRouter]);
    }
  }
}
