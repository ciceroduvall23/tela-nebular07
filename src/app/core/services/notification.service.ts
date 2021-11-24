import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifyMe: BehaviorSubject<any>
  _shouldPlaySound: BehaviorSubject<any>

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const notifyMe = localStorage.getItem('NOTIFY')
    if (notifyMe && notifyMe.length > 0) {
      this.notifyMe = new BehaviorSubject(JSON.parse(notifyMe))
    } else {
      this.notifyMe = new BehaviorSubject(false)
    }

    const playSound = localStorage.getItem('PLAY_NOTIFICATION_SOUND')
    if (playSound && playSound.length > 0) {
      this._shouldPlaySound = new BehaviorSubject(JSON.parse(playSound))
    } else {
      this._shouldPlaySound = new BehaviorSubject(false)
    }

    // if (isPlatformBrowser(this.platformId)) {
    document.addEventListener('DOMContentLoaded', function () {
      if (!('Notification' in window)) {
        console.log('Web Notification not supported')
        return
      }
      Notification.requestPermission()
        .then((success) => {
          // Permission is granted
        })
        .catch((reason) => {
          console.log(reason)
        })
    })
    // }
  }

  public get currentNotification$() {
    return this.notifyMe.asObservable()
  }

  public get notificationValue() {
    return this.notifyMe.value
  }

  public set notification(val: boolean) {
    if (typeof val == 'boolean') {
      this.notifyMe.next(val)
      localStorage.setItem('NOTIFY', JSON.stringify(val))
    }
  }

  set shouldPlaySound(shouldPlaySound: boolean) {
    localStorage.setItem('PLAY_NOTIFICATION_SOUND', JSON.stringify(shouldPlaySound))
    this._shouldPlaySound.next(shouldPlaySound)
  }

  display(
    title: string,
    message: string,
    order: any,
    timeout: number = 5000,
    icon: string = 'assets/imgs/bell-icon.png'
  ) {
    if (!this.notificationValue) return
    Notification.requestPermission((permission) => {
      var notification = new Notification(title, {
        body: message,
        icon: icon,
        dir: 'auto',
        silent: false,
      })
      if (this.shouldPlaySound) {
        this.playSound()
      }
      if (timeout > 0) {
        setTimeout(() => {
          notification.close()
        }, timeout)
      }
    })
  }

  playSound() {
    if (this.notificationValue == true) {
      let audio = new Audio()
      audio.src = 'assets/sound/notification_sound.mp3'
      // audio.load();
      // audio.play();

      var playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch((error) => {
            // Auto-play was prevented
            // Show paused UI.
          })
      }
    }
  }
}
