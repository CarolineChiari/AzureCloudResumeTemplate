import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { MainPageComponent } from "./main-page/main-page.component";
import { MsaladminguardGuard } from "./msaladminguard.guard";
import { ResumeComponent } from "./Resume/Resume.component";

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
  },
  {
    path: "resume",
    component: ResumeComponent,
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./administration/administration.module").then(
        (m) => m.AdministrationModule
      ),
    canLoad: [MsaladminguardGuard],
  },
  {
    path: "admin/:selection",
    loadChildren: () =>
      import("./administration/administration.module").then(
        (m) => m.AdministrationModule
      ),
    canLoad: [MsaladminguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
