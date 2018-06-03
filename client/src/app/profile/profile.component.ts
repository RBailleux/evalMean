import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';
import { TapService, ScoreDetails } from'../tap.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;

  scoreIsOdd = true;
  score = 0;
  finalScore = 0;

  started = false;

  timeToPlay = 10; //Adjust this value to increment or decrement to timer to play. Value is in seconds
  countup = 0;
  timerWidth = 0;

  constructor(private auth: AuthenticationService, private router: Router, private tap: TapService) {  }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  tapped() {
    if(!this.started){
      this.started = true;
      let interval = setInterval(() => {
        console.log(this.countup);
        this.countup++;
        this.timerWidth = ((this.countup)*100)/this.timeToPlay;
        console.log(this.timerWidth);

        if(this.countup >= this.timeToPlay){
          clearInterval(interval);
          this.tap.saveScore({
            email: this.details.email,
            points: this.score
          }).subscribe(() => {
            this.router.navigateByUrl('/tap');
          })
        }
      }, 1000);
    }
    this.score++;
    this.scoreIsOdd = !this.scoreIsOdd;
  }
}
