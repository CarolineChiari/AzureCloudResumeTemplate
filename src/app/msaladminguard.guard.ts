import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  UrlSegment,
} from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-browser";
import { Observable } from "rxjs";
// import { environment } from "src/environments/environment";

/**
 * This route guard makes sure that a user is properly authenticated to Azure Active Directory
 *
 * @export
 * @class MsaladminguardGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: "root",
})

export class MsaladminguardGuard implements CanActivate {
  constructor(private msalService: MsalService, private router: Router) {}

  /**
   * Logs a user in and proceed to a specified route.
   * If the user is not logged in, a popup window will log the user in.
   *
   * @param {string} route Route to redirect the user to once logged in.
   * @memberof MsaladminguardGuard
   */
  login(route: string) {
    
    let tokenResponse = this.msalService.instance
      .handleRedirectPromise()
      .then((result) => {
        let accountObj;
        if (result) {
          accountObj = result.account;
        } else {
          accountObj = this.msalService.instance.getAllAccounts()[0];
        }
        console.log(accountObj);
        if (accountObj) {
          this.msalService.acquireTokenSilent({
              account: this.msalService.instance.getAllAccounts()[0],
              scopes: ["User.Read"],
            }).subscribe((response) => {
              console.log(response);
              if (!response.account) {
                this.msalService
                  .loginPopup()
                  .subscribe((response: AuthenticationResult) => {
                    this.msalService.instance.setActiveAccount(
                      response.account
                    );
                    // console.log(route)
                    this.router.navigate([route]);
                  });
              } else {
                this.msalService.instance.setActiveAccount(response.account);
                // console.log(route)
                this.router.navigate([route]);
              }
            },error=>{
              this.msalService.acquireTokenRedirect({
                account: this.msalService.instance.getAllAccounts()[0],
                scopes: ["User.Read"],
              }).subscribe(response=>{
                // console.log(route)
                this.router.navigate([route]);
              })
            });
        }else{
          this.msalService.instance.loginPopup().then(response=>{
            // console.log(route)
            this.router.navigate([route]);
          })
        }
      });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.msalService.instance.getActiveAccount() == null) {
      this.login(state.toString().replace(/,/g,'/'));
      return false;
    }
    return true;
  }
  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.msalService.instance.getActiveAccount() == null) {
      // console.log(state.toString().replace(/,/g,'/'));
      this.login(state.toString().replace(/,/g,'/'));
      return false;
    }
    return true;
  }
}
