import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder, library: FaIconLibrary) {

    library.addIcons(
      faUser
    );
  }

  ngOnInit() {
    this.createForm();
  }

  register() {
  }

  openModal(){
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      username: [''],
      email: [''],
      dateOfBirth: [''],
      password: [''],
      confirmPassword: ['']
    });
  }
}
