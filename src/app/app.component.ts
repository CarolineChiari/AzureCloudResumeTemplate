import { Component, OnInit } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-browser";
import { environment } from "src/environments/environment";
import { User } from "./Models/User.model";
import { BackendAPIService } from "./services/backendAPI/backendAPI.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit{
  title = "CloudResumeTemplate";
  environment = environment;
  user: User = null
  constructor(private msalService: MsalService, private backendAPI:BackendAPIService) {}
  ngOnInit(){
    this.backendAPI.getUserObservable().subscribe( user => {
      this.user = user
    });
    this.backendAPI.getUserInformation();

  }

  login() {
    this.msalService
      .loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
      });
  }
  logout() {
    this.msalService.logout();
  }
  getUserAccount() {
    if (this.msalService.instance.getActiveAccount() !== null)
      return this.msalService.instance.getActiveAccount().name;
    return null;
  }
}
