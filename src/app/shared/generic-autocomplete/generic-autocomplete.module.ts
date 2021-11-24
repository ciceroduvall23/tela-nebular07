import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'

import {
  NbAutocompleteModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme'

import { GenericAutocompleteComponent } from './generic-autocomplete.component'

@NgModule({
  declarations: [GenericAutocompleteComponent],
  imports: [
    CommonModule,
    NbInputModule,
    NbFormFieldModule,
    NbSpinnerModule,
    FormsModule,
    NbSpinnerModule,
    NbAutocompleteModule,
    NbIconModule,
  ],
  exports: [GenericAutocompleteComponent],
})
export class GenericAutocompleteModule {}
