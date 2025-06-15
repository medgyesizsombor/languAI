import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IntSelectorModel, OtherUserViewModel } from 'src/api/models';

@Component({
  selector: 'app-create-new-message-modal',
  templateUrl: './create-new-message-modal.component.html',
  styleUrls: ['./create-new-message-modal.component.scss'],
  standalone: false
})
export class CreateNewMessageModalComponent implements OnInit {
  @Input('friendList') friendList: Array<OtherUserViewModel> = [];
  friendId: number | undefined;
  newMessageForm: FormGroup | undefined;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(
      this.newMessageForm?.controls['userId'].value,
      'confirm'
    );
  }

  isSelectValueChanged(event: CustomEvent) {
    const friendId = event.detail.value;
    this.modalController.dismiss(friendId, 'confirm');
  }

  /**
   * Create form
   */
  private createForm() {
    this.newMessageForm = this.formBuilder.group({
      userId: ['', [Validators.required]]
    });
  }
}
