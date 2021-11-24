import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-generic-autocomplete',
  templateUrl: './generic-autocomplete.component.html',
  styleUrls: ['./generic-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericAutocompleteComponent implements OnInit, OnDestroy {
  @Input() data: Observable<any[]>

  @Input() placeholder: string
  @Input() autocompleteParameter: string
  @Input() prefixIcon: string
  @Output() selectionChanged = new EventEmitter<any>()

  private unsubscribe$ = new Subject()
  private _data$ = new BehaviorSubject<any[]>([])
  data$: Observable<any[]>
  searchTerm: string
  autofocus = new BehaviorSubject<boolean>(false)

  ngOnInit() {
    this.data$ = this._data$.asObservable()
    this.data.subscribe((v) => this._data$.next(v))
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getOptionValue(option: any) {
    return option[this.autocompleteParameter]
  }

  inputChanged(inputValue: string) {
    if (inputValue) {
      this.data$ = this.getFilteredOptions(inputValue)
    } else {
      this.data$ = this._data$.asObservable()
      this.selectionChanged.emit(null)
    }
  }

  private getFilteredOptions(value: string): Observable<any[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)))
  }

  private filter(value: string = this.searchTerm): any[] {
    const filterValue = this.normalizeString(value)
    return this._data$.value.filter((selectionValue) =>
      this.normalizeString(selectionValue[this.autocompleteParameter]).includes(
        filterValue
      )
    )
  }

  onSelectionChange(selectionValue: string) {
    if (selectionValue) {
      const foundValue = this._data$.value.find(
        (c) => c[this.autocompleteParameter] == selectionValue
      )

      this.selectionChanged.emit(foundValue)
    }
  }

  private normalizeString(str: string) {
    return str
      .toLowerCase()
      .replace('ã', 'a')
      .replace('â', 'a')
      .replace('á', 'a')
      .replace('ẽ', 'a')
      .replace('ê', 'a')
      .replace('é', 'a')
      .replace('ĩ', 'i')
      .replace('î', 'i')
      .replace('í', 'i')
      .replace('õ', 'o')
      .replace('ô', 'o')
      .replace('ó', 'o')
      .replace('ũ', 'o')
      .replace('û', 'o')
      .replace('ú', 'o')
  }

  private filterArrayToUniquesOnly(srcArray: any[]): any[] {
    return srcArray
      .map((v) => JSON.stringify(v))
      .filter((v, idx, src) => src.indexOf(v) === idx)
      .map((v) => JSON.parse(v))
      .sort((a, b) =>
        (a[this.autocompleteParameter] as string).localeCompare(
          b[this.autocompleteParameter] as string
        )
      )
  }
}
