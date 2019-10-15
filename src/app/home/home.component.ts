import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * The player name.
  */
  playerName: string;

  constructor(private router:Router){ }

  ngOnInit() {

  }

  /**
   * Submit function
   * Redirect and pass the player name to the 'game-room' page
   */
  submit() {
    this.router.navigate(['/game-room'], { queryParams: { playerName: this.playerName }});
  }
}