import { Component, OnInit } from '@angular/core';
import { PROFILE_TITLE, SETTINGS_NAVIGATION, SIGN_UP_NAVIGATION } from '../../util/util.constants';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.loadData();
    this.createForm();
    this.fillForm();
  }

  changeEditMode() {
    this.isEdit != this.isEdit;
  }

  logout() {
    this.localStorageService.removeJwtToken();
    this.router.navigate(['/' + SIGN_UP_NAVIGATION]);
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
