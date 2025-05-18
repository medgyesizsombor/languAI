import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/util/services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent {
  @Input() title = '';
  @Input() navigationLink = '';
  @Input() useNavController = false;
  @Input() showBackArrow = false;
  @Input() showSaveButton = false;
  @Input() showAddButton = false;
  @Input() showSavingMissed = false;
  @Input() showSendingMissed = false;
  @Input() showMessageButton = false;

  @Output() saveButtonEmit = new EventEmitter<void>();
  @Output() addButtonEmit = new EventEmitter<void>();
  @Output() navigateBackWithoutSavingEmit = new EventEmitter<boolean>();
  @Output() sendMessageButtonEmit = new EventEmitter<void>();

  //TODO: mentés hiányában visszagomb

  constructor(
    private router: Router,
    private navController: NavController,
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
      if (this.navigationLink.length) {
        this.router.navigate(['/', this.navigationLink]);
      } else {
        this.navController.pop();
      }
    }
  }
}
