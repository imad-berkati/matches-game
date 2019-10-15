import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-game-room",
  templateUrl: "./game-room.component.html",
  styleUrls: ["./game-room.component.scss"]
})
export class GameRoomComponent implements OnInit {
  /**
   * The player name.
   */
  playerName: string;

  /**
   * The number of matches displayed in the UI.
   */
  numberOfMatches: number;

  /**
   * Array of matches index
   */
  matchesIndexArray = [];

  /**
   * boolean indicate if robot starts as first
   */
  isRobotStartAsFirst: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // get the playerName from the url
    this.route.queryParams.subscribe(params => {
      this.playerName = params["playerName"];
    });

    if (!this.playerName || this.playerName.length === 0 || !this.playerName.trim()) {
      this.playerName = "Player 1";
    }

    // Init the number of matches with a random value between 4 and 32
    this.numberOfMatches = Math.floor(Math.random() * 10 + 1) * 4 + Math.floor(Math.random() * 3 + 1);
    console.log("this.numberOfMatches", this.numberOfMatches);
    // Generate the matches index array
    this.matchesIndexArray = Array(this.numberOfMatches)
      .fill(0)
      .map((x, i) => i + 1);
    // Random boolean, probabilities (50% true, 50 false)
    this.isRobotStartAsFirst = Math.random() < 0.5;
    if (this.isRobotStartAsFirst) {
      setTimeout(() => {
        this.goRobot(this.numberOfMatches);
      }, 50);
    }
  }

  /**
   * Subtract the chosenNumber from the numberOfMatches
   *
   * @remarks This function is called by the UI player
   *
   * @param chosenNumber - the number choosed by the player
   */
  burnMatches(chosenNumber: number) {
    this.numberOfMatches = this.numberOfMatches - chosenNumber;
    if (this.numberOfMatches <= 0) {
      alert("The winner is ## " + this.playerName + " ##");
      this.ngOnInit();
    } else {
      this.matchesIndexArray = Array(this.numberOfMatches)
        .fill(0)
        .map((x, i) => i + 1);
      this.goRobot(this.numberOfMatches);
    }
  }

  /**
   * Best move to win.
   *
   * The rule is that we need to subtract a number
   * of matches to let a multiple of 4 [4, 8, 16 ...] in the table.
   *
   * @remarks This function is called by the robot.
   *
   * @param numberOfMatches - the number of matches on the table
   * @returns      The chosen number by robot [1,2,3].
   */
  bestMove(numberOfMatches: number): number {
    var chosenNumber: number;

    if (numberOfMatches < 4) {
      chosenNumber = numberOfMatches;
    } else if (numberOfMatches % 4 == 0) {
      chosenNumber = Math.floor(Math.random() * 3 + 1);
    } else {
      chosenNumber = numberOfMatches % 4;
    }

    return chosenNumber;
  }

  /**
   * Subtract the chosenNumber from the numberOfMatches
   *
   * @remarks This function is called by the robot.
   *
   * @param numberOfMatches - the number of matches on the table
   */
  goRobot(numberOfMatches: number) {
    var chosenNumber = this.bestMove(numberOfMatches);
    alert("The robot burned : " + chosenNumber + " matches");
    this.numberOfMatches = this.numberOfMatches - chosenNumber;

    if (this.numberOfMatches <= 0) {
      alert("The winner is ## Robot ##");
      this.ngOnInit();
    } else {
      this.matchesIndexArray = Array(this.numberOfMatches)
        .fill(0)
        .map((x, i) => i + 1);
    }
  }
}
