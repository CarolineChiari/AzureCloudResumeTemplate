import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  constructor() { }
loadingPhrases=[
  "Serverless goodness in progress, please wait...",
  "I'm too cheap to pay for always on. Wait for serverless to start up.<br/>(It's worth it)",
]
loadingPhrase: string;
  ngOnInit(): void {
    this.loadingPhrase = this.loadingPhrases[Math.floor(Math.random()*(this.loadingPhrases.length))]
  }

}
