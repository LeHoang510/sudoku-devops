import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list"
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterModule} from "@angular/router";
import {InteractoModule, interactoTreeUndoProviders} from "interacto-angular";
import { BoardComponent } from './game/board/board.component';
import { HistoryComponent } from './game/history/history.component';
import { LeaderboardComponent } from './game/leaderboard/leaderboard.component';
import { DialogComponent } from './game/leaderboard/dialog/dialog.component';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HistoryComponent,
    LeaderboardComponent,
    DialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        InteractoModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        FormsModule,
        MatCheckboxModule,
        RouterModule,
        MatGridListModule,
        MatDialogModule
    ],
  providers: [interactoTreeUndoProviders(true)],
  bootstrap: [AppComponent]
})
export class AppModule {
}
