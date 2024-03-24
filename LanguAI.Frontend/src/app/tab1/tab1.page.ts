import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/api/services';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers$Plain().subscribe(res => {
      console.log(res);
    })
  }
}
