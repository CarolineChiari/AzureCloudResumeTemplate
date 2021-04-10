import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../Models/Job.model';
import { User } from '../Models/User.model';
import { BackendAPIService } from '../services/backendAPI/backendAPI.service';

@Component({
  selector: 'app-Resume',
  templateUrl: './Resume.component.html',
  styleUrls: ['./Resume.component.css']
})

export class ResumeComponent implements OnInit {

  @Input() jobs: Job[]=[];
  filter: string[]=[];
  @Input() user: User;

  constructor(private backendAPI:BackendAPIService) { }

  ngOnInit() {
    // this.backendAPI.getJobsObservable().subscribe(jobs=>{
    //   this.jobs = jobs;
    // });
    // this.backendAPI.getUserObservable().subscribe(user=> {
    //   this.user = user;
    // })
    // this.backendAPI.getJobs();
  }
hasFilter(duty: {responsibility: string, skills: string[]}){
  var found = false;
  duty.skills.forEach(skill => {
    if (this.filter.contains(skill))
      found=true;
  })
  return found;
}
  isFiltered(skill:string){
    return this.filter.contains(skill);
  }
  addFilter(skill: string){
    if (this.filter.contains(skill)){
      this.filter.splice(this.filter.findIndex(v => v===skill),1);
    }else{
      this.filter.push(skill)
      this.filter.unique();
    }
  }
}
