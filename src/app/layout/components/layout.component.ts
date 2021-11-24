import { Component, HostListener } from '@angular/core'
import { NbSidebarService } from '@nebular/theme'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})
export class LayoutComponent {

  teste(){
    alert('You are my hero!');

  }
  

}
/* 
  clickMessage = '';
  onClickMe() {
    alert('You are my hero!');
*/