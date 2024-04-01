import { Component, OnInit } from '@angular/core';
import { PROFILE_TITLE, SETTINGS_NAVIGATION } from '../../util/util.constants';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup | undefined;
  title = PROFILE_TITLE;
  navigationLink = SETTINGS_NAVIGATION;
  profile = {
    image: 'asd',
    username: 'asd1',
    email: 'asd@asdMASD.com'
  };
  isEdit = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadData();
    this.createForm();
    this.fillForm();
  }

  changeEditMode() {
    this.isEdit != this.isEdit;
  }

  private loadData() {
    //TODO ide az api hívás
  }

  private createForm() {
    this.profileForm = this.formBuilder.group({
      username: new FormControl({value: this.profile.username, disabled: true}),
      email: [''],
      dateOfBirth: ['']
    });
  }

  private fillForm() {
    this.profileForm?.patchValue({
      username: this.profile.username,
      email: this.profile.email
    });
  }

}
