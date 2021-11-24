import { Component, EventEmitter, Input, Optional, Output } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss'],
})
export class ConfirmActionComponent {
  @Input() title: string = 'Tem certeza que deseja fazer isso?'
  @Output() confirm: EventEmitter<boolean> = new EventEmitter()

  constructor(@Optional() private dialogRef: NbDialogRef<ConfirmActionComponent>) {}

  confirmAction(confirm: boolean) {
    this.confirm.emit(confirm)
    if (this.dialogRef) {
      this.dialogRef.close({ confirm })
    }
  }
}
