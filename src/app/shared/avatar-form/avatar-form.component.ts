import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from '@core/models'

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss'],
})
export class AvatarFormComponent {
  @Input() user: User
  @Input() convertBase64 = false
  @Input() imageSrc: string = 'assets/img/no-image.png'
  @Output() imageChanged = new EventEmitter<File | string>()

  base64: string
  _imageSrc: string

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.base64 = reader.result as string
        this._imageSrc = this.base64
        if (!this.convertBase64) {
          this.imageChanged.emit(file)
        } else {
          this.imageChanged.emit(this.base64)
        }
      }
    }
  }
}
