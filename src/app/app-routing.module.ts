import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
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
    loadChildren: () => import('./administration/administration.module').then(m=>m.AdministrationModule),
    canLoad: [MsalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
