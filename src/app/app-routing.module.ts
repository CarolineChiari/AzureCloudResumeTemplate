import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { MsaladminguardGuard } from "./msaladminguard.guard";
import { ResumeComponent } from "./Resume/Resume.component";

const routes: Routes = [
  {
    path: "",
    component: ResumeComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
