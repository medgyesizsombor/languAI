import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardListAccessEnum } from 'src/api/models';
import { AlertService } from 'src/app/util/services/alert.service';

@Component({
  selector: 'app-edit-acces-fab',
  templateUrl: './edit-acces-fab.component.html',
  styleUrls: ['./edit-acces-fab.component.scss']
})
export class EditAccesFabComponent implements OnInit {
  @Input() currentAccess: CardListAccessEnum | undefined;

  @Output() changeAccessEmit = new EventEmitter<CardListAccessEnum>();

  constructor(private alertService: AlertService) {}

  ngOnInit() {}

  openAccessAlert() {
    this.alertService
      .showAccessAlert(this.currentAccess ?? CardListAccessEnum.Public)
      .then((res: CardListAccessEnum | null) => {
        if (res) {
          this.changeAccessEmit.emit(res);
        }
      });
  }
}
