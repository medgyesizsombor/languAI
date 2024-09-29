import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccessEnum } from 'src/api/models';
import { AlertService } from 'src/app/util/services/alert.service';

@Component({
  selector: 'app-edit-acces-fab',
  templateUrl: './edit-acces-fab.component.html',
  styleUrls: ['./edit-acces-fab.component.scss']
})
export class EditAccesFabComponent implements OnInit {
  @Input() currentAccess: AccessEnum | undefined;

  @Output() changeAccessEmit = new EventEmitter<AccessEnum>();

  constructor(private alertService: AlertService) {}

  ngOnInit() {}

  openAccessAlert() {
    this.alertService
      .showAccessAlert(this.currentAccess ?? AccessEnum.Public)
      .then((res: AccessEnum | null) => {
        if (res) {
          this.changeAccessEmit.emit(res);
        }
      });
  }
}
