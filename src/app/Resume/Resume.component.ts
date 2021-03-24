import { Component, OnInit } from '@angular/core';
import { Job } from '../Models/Job.model';

@Component({
  selector: 'app-Resume',
  templateUrl: './Resume.component.html',
  styleUrls: ['./Resume.component.css']
})
export class ResumeComponent implements OnInit {

  Jobs: Job[]=[];

  constructor() { }

  ngOnInit() {
    this.Jobs.push({
      title: "Cloud & Data Engineer",
      employer: {
        name: "The Cloud",
        website: "https://azure.com"
      },
      dates: {
        start: new Date("1/1/2020")
      },
      duties: [
        {description:"Do Cloud Stuff",skills:["Azure","AWS","Google Cloud"]},
        {description:"Create a cloud resume",skills:["Azure","Azure Functions","Azure API Management","Azure Storage","Angular","Azure Virtual Network", "Azure DNS"]}
      ]
    })
  }


}
