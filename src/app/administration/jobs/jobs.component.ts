import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Job } from "src/app/Models/Job.model";
import { BackendAPIService } from "src/app/services/backendAPI/backendAPI.service";
import { AdminAPIService } from 'src/app/services/adminAPI/adminAPI.service';

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.css"],
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  newJobForm: FormGroup;
  newResponsibilities: FormArray;
  // jobStyle: { [klass: string]: any }[] = [];
  jobStyle:boolean[]=[]
  constructor(
    private backendAPI: BackendAPIService,
    private adminAPI: AdminAPIService
  ) {}

  ngOnInit() {
    this.newForm();
    this.backendAPI.getJobsObservable().subscribe((jobs) => {
      this.jobs = jobs;
      while (this.jobStyle.length !== this.jobs.length) {
        // this.jobStyle.push({
        //    "height.px": "auto",
        //    "overflow":"hidden"
        //   });
        this.jobStyle.push(false);
      }
    });
    this.backendAPI.getJobs();
  }
  newJob(form: FormGroup) {
    var job = form.getRawValue();
    job.duties = this.getDuties();
    this.adminAPI.updateJobData(job);
  }
  getDuties() {
    var responsibilities = this.newResponsibilities.getRawValue();

    responsibilities.forEach((resp) => {
      resp.skills = resp.skills.split(",");
    });
    responsibilities.forEach((resp) => {
      if (resp.skills.length) {
        for (var i = 0; i < resp.skills.length; i++) {
          resp.skills[i] = resp.skills[i].trim();
          if (!resp.skills[i]) {
            resp.skills.splice(i, 1);
            i--;
          }
        }
      }
    });
    // console.log(responsibilities);
    return responsibilities;
  }
  newForm() {
    this.newJobForm = new FormGroup({
      id: new FormControl(""),
      title: new FormControl(""),
      company: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
    });
    this.newResponsibilities = new FormArray([]);
    this.addResponsibility();
  }
  addResponsibility() {
    const group = new FormGroup({
      responsibility: new FormControl(""),
      skills: new FormControl(""),
    });
    this.newResponsibilities.push(group);
  }
  removeResponsibility(index: number) {
    this.newResponsibilities.controls.splice(index, 1);
    if (index === 0 && this.newResponsibilities.controls.length === 0) {
      this.addResponsibility();
    }
  }
  edit(job: Job) {
    this.newForm();
    this.newJobForm.setValue({
      id: job.id,
      title: job.title,
      company: job.company,
      startDate: job.startDate,
      endDate: job.endDate,
    });
    if (job.duties) {
      if (job.duties.length >= 1) {
        this.newResponsibilities.controls[0].setValue({
          responsibility: job.duties[0].responsibility,
          skills: job.duties[0].skills.join(","),
        });
      }
      if (job.duties.length > 1) {
        for (var i = 1; i < job.duties.length; i++) {
          this.addResponsibility();
          this.newResponsibilities.controls[i].setValue({
            responsibility: job.duties[i].responsibility,
            skills: job.duties[i].skills.join(","),
          });
        }
      }
    }
  }
  toggleJob(index: number) {
    this.jobStyle[index] = !this.jobStyle[index];
    return
    console.log(this.jobStyle[index])
    if (this.jobStyle[index]["height.px"] === "auto") {
      this.jobStyle[index]["height.px"] = "0";
      this.jobStyle[index]["overflow"] = "hidden";
    } else {
      this.jobStyle[index]["height.px"] = "auto";
      this.jobStyle[index]["overflow"] = "hidden";
    }
  }
  getJobStyle(index: number) {
    // console.log(index);
    // console.log(this.jobStyle[index]);
    return this.jobStyle[index];
  }
}
