import { Injectable } from '@angular/core';
import { FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faSync, faTimes } from '@fortawesome/pro-light-svg-icons';

import { faLockAlt } from '@fortawesome/pro-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class FontAwesomeIconRegistryService {
  constructor(private library: FaIconLibrary, private faConfig: FaConfig) {}

  init(): void {
    // config
    this.faConfig.defaultPrefix = 'fal';

    // light icons
    this.library.addIcons(faTimes, faSync);

    // solid icons
    this.library.addIcons(faLockAlt);
  }
}
