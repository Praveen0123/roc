import { Component } from '@angular/core';
import { FontAwesomeIconRegistryService } from '@core/services/icon-registry/font-awesome-icon-registry.service';

@Component({
  selector: 'roc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
{
  title = 'returnon college client';

  constructor(
    private fontAwesomeIconRegistryService: FontAwesomeIconRegistryService
  )
  {
    this.fontAwesomeIconRegistryService.init();
  }
}
