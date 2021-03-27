import { Component } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-browser";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "CloudResumeTemplate";
  environment = environment;
  constructor(private msalService: MsalService) {}

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
