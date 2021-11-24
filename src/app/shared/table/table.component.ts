import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { NbMenuItem, NbMenuService } from '@nebular/theme'
import { Observable, Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'
import { CustomColumn, TableActionClick, TableColumn } from './models'

@Component({
  selector: 'instant-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('data') data: Observable<any[]>
  @Input('columns') columns: TableColumn[]
  @Input('actions') actions: NbMenuItem[]
  @Input('actionsIcon') actionsIcon: string = 'options-2-outline'
  @Input('actionsIconStatus') actionsIconStatus: string = 'primary'
  @Input('actionsColumnName') actionsColumnName: string = 'Ações'
  @Input('searchInputPlaceholder') searchInputPlaceholder: string =
    'Digite algo para filtrar as entradas da tabela'
  @Input('customColumns') customColumns: CustomColumn[]

  @Output('actionOptionClicked') actionOptionClicked =
    new EventEmitter<TableActionClick>()

  @ViewChild(MatTable) table: MatTable<any[]>
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  private unsubscribe$ = new Subject()
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  columnsNames: string[]
  _columns: TableColumn[]
  actionsColumnKey = 'ACTIONS_COLUMN'
  actionsMenuTag = 'TABLE_ACTION_MENU'
  isSearching = false
  formatPrice = (value: number | string): string => {
    if (value) {
      return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
      })
    } else {
      return 'R$ 0'
    }
  }
  currentActionItem: any = null
  tableActionsPerEntryId: { [key: string]: NbMenuItem[] } = {}
  tableActionMenuTagPerEntryId: { [key: string]: string } = {}

  constructor(private menuService: NbMenuService) {}

  ngOnInit(): void {
    if (!this.columns) throw new Error('"columns" @Input() is required')
    this.columnsNames = this.columns.map((col) => col.key)
    this._columns = [...this.columns]
    if (this.actions) {
      this.columnsNames.push(this.actionsColumnKey)
      this._columns.push({ key: this.actionsColumnKey, value: this.actionsColumnName })
      this.actionsMenuClickEvents()
    }
    if (!this.data) throw new Error('"data" @Input() is required')
    this.data.pipe(takeUntil(this.unsubscribe$)).subscribe((data: any[]) => {
      this.configureActionsCache(data)
      this.dataSource.data = data
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  private configureActionsCache(data: any[]) {
    data.forEach((currData: any, idx) => {
      currData = JSON.parse(JSON.stringify(currData))
      if (!currData.id) currData.id = idx

      this.tableActionsPerEntryId[currData.id] = [...this.actions].map((action) => {
        if (Object.keys(action.data).includes('disabled')) {
          const disabledFunction = action.data.disabled
          action = { ...JSON.parse(JSON.stringify(action)) }
          action.data.disabled = disabledFunction
          action.hidden = action.data.disabled(currData)
        }

        return action
      })
      this.tableActionMenuTagPerEntryId[currData.id] =
        this.actionsMenuTag + '-' + currData.id
    })
  }

  private actionsMenuClickEvents(): void {
    this.menuService
      .onItemClick()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(
          (menu) =>
            (menu.tag.includes('-') && menu.tag.split('-')[0]) === this.actionsMenuTag
        )
      )
      .subscribe((bag) =>
        this.actionOptionClicked.emit({ bag, data: this.currentActionItem })
      )
  }

  getCurrentCustomColumn(propertyName: string): CustomColumn {
    return this.customColumns.find((col) => col.propertyName === propertyName) as {
      propertyName: string
      templateRef: TemplateRef<any>
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
