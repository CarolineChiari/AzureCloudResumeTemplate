import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { UserAdministrationComponent } from './UserAdministration/UserAdministration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIinterceptorInterceptor } from './interceptors/apiinterceptor.interceptor';
import { JobsComponent } from './jobs/jobs.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RichTextEditorComponent } from './UserAdministration/richTextEditor/richTextEditor.component';


@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [AdministrationComponent,UserAdministrationComponent,JobsComponent,RichTextEditorComponent],
  providers:[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: APIinterceptorInterceptor,
        multi: true,
      },
  ]
})
export class AdministrationModule { }
