import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ResumeComponent } from "./Resume/Resume.component";
import { MsalGuardConfiguration, MsalInterceptor, MsalModule, MsalService, MSAL_INSTANCE } from "@azure/msal-angular";
import { environment } from "src/environments/environment";
import {
  InteractionType,
  PopupRequest,
  PublicClientApplication,
  Configuration,
  IPublicClientApplication
} from "@azure/msal-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.azureADApplicationID,
      redirectUri: environment.redirectURI,
      authority: `https://login.microsoftonline.com/${environment.azureADTenantID}/`
    }
  })
}

@NgModule({
  declarations: [AppComponent, ResumeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule
    //from https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md
    // MsalModule.forRoot(
    //   new PublicClientApplication(
    //     // MSAL Configuration
    //     {
    //       auth: {
    //         clientId: environment.azureADApplicationID,
    //         authority: "https://login.microsoftonline.com/common/",
    //         redirectUri: "http://localhost:4200"
    //       },
    //       cache: {
    //         cacheLocation: "localStorage",
    //         secureCookies: true
    //       }
    //     }
    //   ),
    //     {
    //       interactionType: InteractionType.Popup, // MSAL Guard Configuration
    //       // authRequest: {
    //       //   redirectUri: "http://localhost:4200",
    //       //   authority: "https://login.microsoftonline.com/common/"
    //       // }
    //     }
    //   ,
    //   {
    //     protectedResourceMap: new Map([
    //       ['http://localhost:4200/admin/', null]
    //     ]),
    //     interactionType: InteractionType.Popup,

    //   }
    // ),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true,
    // },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
