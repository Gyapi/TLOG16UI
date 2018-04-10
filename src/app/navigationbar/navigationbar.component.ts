import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navigationbar.component.html'
})
export class NavigationbarComponent implements OnInit {

  @Output() changeComponent = new EventEmitter<boolean>();
  private whoIsOnTop: boolean;

  constructor() { }

  ngOnInit() {
    this.changeComponentToCalendar();
  }

  private changeComponentToCalendar() : void {
    this.whoIsOnTop = true;
    this.changeComponent.emit(true);
  }

  private changeComponentToTable() : void {
    this.whoIsOnTop = false;
    this.changeComponent.emit(false);
  }

}
