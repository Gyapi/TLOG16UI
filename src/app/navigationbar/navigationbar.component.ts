import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  @Output() changeComponent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.changeComponentToCalendar();
  }

  changeComponentToCalendar() : void {
    document.getElementById('litable').classList.remove('active')
    document.getElementById('licalendar').classList.add('active');
    this.changeComponent.emit(true);
  }

  changeComponentToTable() : void {
    document.getElementById('licalendar').classList.remove('active')
    document.getElementById('litable').classList.add('active');
    this.changeComponent.emit(false);
  }

}
