import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, PageNotFoundComponent],
})
export class CoreModule {}
