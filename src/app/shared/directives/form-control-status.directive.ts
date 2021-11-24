import { Directive, ElementRef, Host, Input, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormControl } from '@angular/forms'
import { NbInputDirective } from '@nebular/theme'
import { fromEvent, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Directive({
  selector: '[status][appFormControlStatus]',
})
export class FormControlStatusDirective implements OnInit, OnDestroy {
  @Input() control: AbstractControl

  constructor(
    @Host() private inputDirective: NbInputDirective,
    private host: ElementRef
  ) {}

  ngOnInit() {
    this.inputDirective.status = this.getFormControlSatus(this.control)

    fromEvent(this.host.nativeElement, 'input')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.inputDirective.status = this.getFormControlSatus(this.control)
      })
  }

  getFormControlSatus(control: FormControl | AbstractControl) {
    if (control && !control.pristine) {
      if (control.errors) {
        return 'danger'
      } else if (control.valid) {
        return 'success'
      } else {
        return 'basic'
      }
    } else {
      return 'basic'
    }
  }

  private unsubscribe$ = new Subject()
  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
