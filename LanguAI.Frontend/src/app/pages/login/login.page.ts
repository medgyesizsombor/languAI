import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder, library: FaIconLibrary) {

    library.addIcons(
      faUser
    );
  }

  ngOnInit() {
    this.createForm();
  }

  login() {
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
}
