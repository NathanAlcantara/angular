import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'n-light-mode-toggle',
  templateUrl: './light-mode-toggle.component.html',
  styleUrls: ['./light-mode-toggle.component.scss'],
})
export class LightModeToggleComponent implements OnInit {
  isChecked = true;
  lightModeKey = 'lightMode';

  get mode(): string {
    return this.isChecked ? 'nightlight_round' : 'light_mode';
  }

  ngOnInit(): void {
    const isLightModeItem = localStorage.getItem(this.lightModeKey);
    const isLightkMode = isLightModeItem
      ? JSON.parse(isLightModeItem)
      : !this.isChecked;

    if (isLightkMode) {
      this.changed();
    }
  }

  changed(): void {
    this.isChecked = !this.isChecked;
    localStorage.setItem(this.lightModeKey, String(!this.isChecked));
    document.body.classList.toggle(this.lightModeKey);
  }
}
