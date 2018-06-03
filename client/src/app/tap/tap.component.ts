import { Component } from '@angular/core';
import { TapService } from '../tap.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'tap-list',
  templateUrl: './tap.component.html'
})
export class TapComponent {

  scores;

  constructor(private tap: TapService, private router: Router, private auth: AuthenticationService) {}

  ngOnInit() {
    this.tap.getScores().subscribe(scores => {
      this.scores = scores;
      console.log(this.scores);
    }, (err) => {
      console.error(err);
    });
  }
}
