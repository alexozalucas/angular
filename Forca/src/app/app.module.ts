import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PainelComponent } from './painel/painel.component';
import { TopoComponent } from './topo/topo.component';
import { RodadaComponent } from './rodada/rodada.component';
import { ForcaComponent } from './forca/forca.component';

@NgModule({
  declarations: [
    AppComponent,
    PainelComponent,
    TopoComponent,
    RodadaComponent,
    ForcaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
