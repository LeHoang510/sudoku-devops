import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardComponent } from './leaderboard.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameService } from 'src/app/service/game.service';
import { Overlay } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { TreeUndoHistory } from 'interacto';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [GameService,TreeUndoHistory],
      declarations: [ LeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
