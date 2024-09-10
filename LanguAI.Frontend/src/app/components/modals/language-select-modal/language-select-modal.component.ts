import { Component, Input, OnInit } from '@angular/core';
import { IntSelectorModel } from 'src/api/models';

@Component({
  selector: 'app-language-select-modal',
  templateUrl: './language-select-modal.component.html',
  styleUrls: ['./language-select-modal.component.scss']
})
export class LanguageSelectModalComponent implements OnInit {
  @Input() allLanguages: Array<IntSelectorModel> = [];

  languages: Array<IntSelectorModel> = [];

  constructor() {}

  ngOnInit() {}

  select() {
    
  }
}
