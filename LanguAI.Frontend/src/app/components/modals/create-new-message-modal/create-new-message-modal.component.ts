import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IntSelectorModel } from 'src/api/models';
import { ToastrService } from 'src/app/util/services/toastr.service';

@Component({
  selector: 'app-create-new-message-modal',
  templateUrl: './create-new-message-modal.component.html',
  styleUrls: ['./create-new-message-modal.component.scss']
})
export class CreateNewMessageModalComponent implements OnInit {
  @Input('friendList') friendList: Array<IntSelectorModel> = [];

  friendId: number | undefined;

  constructor(
    private modalController: ModalController,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.friendId, 'confirm');
  }

  isSelectValueChanged(event: CustomEvent) {
    const friendId = event.detail.value;
    this.modalController.dismiss(friendId, 'confirm');
  }
}
