import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { AdministrationComponent } from "./administration.component";
import { UserAdministrationComponent } from "./UserAdministration/UserAdministration.component";

const routes: Routes = [
  {
    path: "",
    component: AdministrationComponent
  },
  {
    path: ":selection",
    component: AdministrationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
