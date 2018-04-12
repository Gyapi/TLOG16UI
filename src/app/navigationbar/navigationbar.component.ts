import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navigationbar.component.html'
})
export class NavigationbarComponent implements OnInit {

  @Output() public changeComponent = new EventEmitter<boolean>();
  public whoIsOnTop: boolean;

  constructor() { }

  ngOnInit() {
    this.changeComponentToCalendar();
  }

  public changeComponentToCalendar() : void {
    this.whoIsOnTop = true;
    this.changeComponent.emit(true);
  }

  public changeComponentToTable() : void {
    this.whoIsOnTop = false;
    this.changeComponent.emit(false);
  }

}
