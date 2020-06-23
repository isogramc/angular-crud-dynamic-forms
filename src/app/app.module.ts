import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './component/list/list.component';
import { CreateComponent } from './component/create/create.component';
import { EditComponent } from './component/edit/edit.component';

import { ConfigServiceService } from './config-service.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageService } from './image.service';
import { ListModule } from './component/list/list.module';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list',
    component: ListComponent,
    loadChildren: '../app/component/list/list.module#ListModule'
  },
  { path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    ImageUploadComponent
  ],
  imports: [
    HttpClientModule, BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, RouterModule.forRoot(routes), ListModule,
  ],
  providers: [ConfigServiceService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
