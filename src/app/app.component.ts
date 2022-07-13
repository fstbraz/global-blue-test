import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = 'darkMode';

  constructor(private overlay: OverlayContainer) {}

  ngOnInit() {
    this.overlay.getContainerElement().classList.add(this.className);
  }
}
