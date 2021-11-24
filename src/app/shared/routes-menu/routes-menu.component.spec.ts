import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RoutesMenuComponent } from './routes-menu.component'

describe('RoutesMenuComponent', () => {
  let component: RoutesMenuComponent
  let fixture: ComponentFixture<RoutesMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutesMenuComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
