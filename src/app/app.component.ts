import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  whoIsOnTop : boolean;

  changeComponent(wichOne : boolean): void {
    this.whoIsOnTop = wichOne;
  }
}
