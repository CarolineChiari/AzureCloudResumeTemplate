import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ResumeComponent } from "./Resume/Resume.component";
import {
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_INSTANCE,
} from "@azure/msal-angular";
import { environment } from "src/environments/environment";
import {
  InteractionType,
  PopupRequest,
  PublicClientApplication,
  Configuration,
  IPublicClientApplication,
} from "@azure/msal-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MsaladminguardGuard } from "./msaladminguard.guard";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { APIinterceptorInterceptor } from "./administration/interceptors/apiinterceptor.interceptor";

import {MatTooltipModule} from '@angular/material/tooltip'
import {MatIconModule} from '@angular/material/icon'
import { IntroductionComponent } from "./introduction/introduction.component";
import { MainPageComponent } from './main-page/main-page.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { AboutMeComponent } from './about-me/about-me.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.azureADApplicationID,
      redirectUri: environment.redirectURI,
      authority: `https://login.microsoftonline.com/${environment.azureADTenantID}/`,
    },
  });
}

declare global {
  interface Array<T> {
      contains(value: string, property?: string): boolean;
      unique(property?:string)
  }
}
Array.prototype.contains = function (v, property = null) {
  if (property) {
    for (var i = 0; i < this.length; i++) {
      if (this[i][property] === v) return true;
    }
    return false;
  } else {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === v) return true;
    }
    return false;
  }
};
/**
 * returns an array made of unique elements
 * @param {*} property
 */
 Array.prototype.unique = function (property = null) {
  if (property) {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      if (!arr.contains(this[i][property], property)) {
        arr.push(this[i]);
      }
    }
    return arr;
  } else {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      if (!arr.contains(this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
  }
};

// export function MSALInterceptorFactory(): MsalInterceptor {
//   return new MsalInterceptor(
//     {
//       interactionType: InteractionType.Redirect,
//       protectedResourceMap: new Map<string, Array<string>>([
//         [environment.adminApiGateway, ["impersonate_user"]],
//       ])
//     },
//     new MsalService(MSALInstanceFactory(),{

//     })
//   );
// }

@NgModule({
  declarations: [AppComponent, ResumeComponent, IntroductionComponent, MainPageComponent, LoadingScreenComponent, AboutMeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatIconModule
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
    //   useClass: APIinterceptorInterceptor,
    //   multi: true,
    // },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
