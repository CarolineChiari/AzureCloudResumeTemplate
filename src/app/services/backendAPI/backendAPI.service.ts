import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Job } from "src/app/Models/Job.model";
import { User } from "src/app/Models/User.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BackendAPIService {
  constructor(private http: HttpClient) {}

  /* -------------------------------------------------------------------------- */
  /*                              User Information                              */
  /* -------------------------------------------------------------------------- */

  private userInformation: User = null;
  private UserObservable = new Subject<User>();
  getUserObservable(): Observable<User> {
    return this.UserObservable.asObservable();
  }
  getUserInformation(force=false) {
    if (!this.userInformation || force) {
      this.http
        .get<User>(`${environment.apiGateway}/user`)
        .subscribe((user) => {
          if (user) {
            this.userInformation = user;
            this.userInformation.lastRefresh = new Date();
            this.UserObservable.next(user);
          }
        });
    } else {
      this.UserObservable.next(this.userInformation);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Jobs Information                              */
  /* -------------------------------------------------------------------------- */

  private jobs: Job[] = [];
  private JobsObservable = new Subject<Job[]>();
  getJobsObservable(): Observable<Job[]> {
    return this.JobsObservable.asObservable();
  }
  getJobs(force:boolean=false) {
    if (this.jobs.length === 0 || force) {
      this.http
        .get<Job[]>(`${environment.apiGateway}/jobs`)
        .subscribe((jobs) => {
          this.jobs = jobs;
          this.JobsObservable.next([...jobs]);
        });
    } else {
      this.JobsObservable.next([...this.jobs]);
    }
  }
}
