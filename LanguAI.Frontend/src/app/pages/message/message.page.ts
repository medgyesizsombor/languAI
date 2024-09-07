import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageViewModel } from 'src/app/util/models/message-view-model';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss']
})
export class MessagePage implements OnInit {
  chatForm: FormGroup | undefined;
  userId: number | null | undefined;
  messages: Array<MessageViewModel> = [
    { text: 'Hello!', sender: 1 },
    { text: 'Helloka!', sender: 7 }
  ];
  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.userId = this.localStorageService.getUserId();
  }

  sendMessage() {
   //TODO
  }

  /**
   * Create the form
   */
  private createForm() {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
}
