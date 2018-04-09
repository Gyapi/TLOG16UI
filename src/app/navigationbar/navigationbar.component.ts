import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navigationbar.component.html'
})
export class NavigationbarComponent implements OnInit {

  @Output() changeComponent = new EventEmitter<boolean>();
  whoIsOnTop: boolean;

  constructor() { }

  ngOnInit() {
    this.changeComponentToCalendar();
  }

  changeComponentToCalendar() : void {
    this.whoIsOnTop = true;
    this.changeComponent.emit(true);
  }

  changeComponentToTable() : void {
    this.whoIsOnTop = false;
    this.changeComponent.emit(false);
  }

}
