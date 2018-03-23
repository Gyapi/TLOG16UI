import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TimeLogger';

  changeComponent(wichOne : boolean): void {
    if (wichOne) {
      document.getElementById('frameCalendar').classList.remove('hidden');
      document.getElementById('frameTable').classList.add('hidden');
    }
    else {
      document.getElementById('frameCalendar').classList.add('hidden');
      document.getElementById('frameTable').classList.remove('hidden');
    }
  }
}
