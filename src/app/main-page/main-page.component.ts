import { Component, OnInit } from '@angular/core';
import { Job } from '../Models/Job.model';
import { User } from '../Models/User.model';
import { BackendAPIService } from '../services/backendAPI/backendAPI.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private backendAPI: BackendAPIService) { }
  jobs: Job[]=[];
  user: User;
  ngOnInit(): void {
    this.backendAPI.getJobsObservable().subscribe(jobs=>{
      this.jobs = jobs;
    });
    this.backendAPI.getUserObservable().subscribe(user=> {
      this.user = user;
    })
    this.backendAPI.getJobs();
    this.backendAPI.getUserInformation();
  }

}
