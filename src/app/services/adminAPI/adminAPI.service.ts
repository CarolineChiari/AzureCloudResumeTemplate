import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { environment } from "src/environments/environment";
import { Job } from "../../Models/Job.model";
import { User } from "../../Models/User.model";
import { BackendAPIService } from "../backendAPI/backendAPI.service";

@Injectable({
  providedIn: "any",
})
export class AdminAPIService {
  constructor(private http: HttpClient, private msalService: MsalService, private publicAPI:BackendAPIService) {}
  private accessToken: string = null;
  setToken() {
    this.msalService
      .acquireTokenSilent({
        account: this.msalService.instance.getAllAccounts()[0],
        scopes: ["User.Read"],
      })
      .subscribe((response) => {
        console.log(response);
        if (response.idToken) this.accessToken = response.idToken;
      });
  }
  getAccessToken(): string {
    if (this.accessToken) return this.accessToken;
    return null;
  }
  updateUserData(userData: User) {
    this.http
      .post<any>(
        `${environment.adminApiGateway}/user`,userData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  updateJobData(job: Partial<Job>) {
    this.http.post<{message:string}>(`${environment.adminApiGateway}/job`, job).subscribe(result=>{
      this.publicAPI.getJobs(true)
    })
  }
}
