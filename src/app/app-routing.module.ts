import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { AdminComponent } from "./Admin/Admin.component";
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
    component: AdminComponent,
    canActivate: [MsalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
