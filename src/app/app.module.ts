import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ResumeComponent } from "./Resume/Resume.component";
import { AdminComponent } from "./Admin/Admin.component";
import { MsalInterceptor, MsalModule } from "@azure/msal-angular";
import { environment } from "src/environments/environment";
import {
  InteractionType,
  PopupRequest,
  PublicClientApplication,
} from "@azure/msal-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, ResumeComponent, AdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //from https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md
    MsalModule.forRoot(
      new PublicClientApplication(
        // MSAL Configuration
        {
          auth: {
            clientId: environment.azureADApplicationID,
          },
        }
      ),
      {
        interactionType: InteractionType.Popup, // MSAL Guard Configuration
      },
      {
        protectedResourceMap: new Map([]),
        interactionType: InteractionType.Popup,
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
