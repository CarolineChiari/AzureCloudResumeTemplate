import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-browser";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MsaladminguardGuard implements CanActivate {
  constructor(private msalService: MsalService, private router: Router) {}
  login(route: any) {
    this.msalService
      .loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        // console.log(route)
        this.router.navigate([route.path])
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
      this.login(route);
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
      this.login(route);
      return false;
    }
    return true;
  }
}
